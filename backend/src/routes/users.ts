import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import bcrypt from "bcrypt";
import { FromSchema } from "json-schema-to-ts";
import { Codes } from "../types";

const namePw = {
  type: "object",
  properties: {
    name: { type: "string" },
    password: { type: "string" },
  },
  required: ["name", "password"],
} as const;

const getUsersHandler =
  (sequelize: Sequelize) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(Codes.Successful).send(
      JSON.stringify(
        ((await sequelize.models["User"]?.findAll()) as User[])?.map(u => ({
          name: u.Name,
          image: u.Image,
          communities: u.Communities,
          projects: u.Projects,
          createdAt: u.createdAt,
        }))
      )
    );
  };

const getUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      query,
    }: FastifyRequest<{
      Querystring: { name: string; password: string };
    }>,
    reply: FastifyReply
  ): Promise<any> => {
    console.log(query.name);
    const data = (await sequelize.models["User"]?.findOne({
      where: { name: query.name },
    })) as User;

    try {
      if (data !== null) {
        const {
          Name: name,
          Image: image,
          Password: password,
          Projects: projects,
          Communities: communities,
          createdAt,
          updatedAt,
          Token: token,
        } = data;

        if (!(await bcrypt.compare(query.password, password))) {
          return reply.status(Codes.Successful).send(
            JSON.stringify(
              {
                allowed: false,
                user: {
                  name,
                  image,
                  createdAt,
                },
              },
              null,
              4
            )
          );
        } else {
          return reply.status(Codes.Successful).send(
            JSON.stringify(
              {
                allowed: true,
                user: {
                  name,
                  password,
                  projects,
                  communities,
                  image,
                  createdAt,
                  updatedAt,
                  token,
                },
              },
              null,
              4
            )
          );
        }
      } else
        return reply.status(Codes.Successful).send(
          JSON.stringify(
            {
              allowed: false,
              message: "Could not find user.",
              user: "No data.",
            },
            null,
            4
          )
        );
    } catch (e: any) {
      console.log(e);
      return reply.status(Codes.Successful).send({
        allowed: false,
        message: "Just an error",
        user: "No data",
      });
    }
  };

const getUserWithTokenHandler =
  (sequelize: Sequelize) =>
  async (
    {
      query,
    }: FastifyRequest<{
      Querystring: { token: string };
    }>,
    reply: FastifyReply
  ): Promise<any> => {
    const data = (await sequelize.model("User")?.findOne({
      where: { name: query.token },
    })) as User;
    const { Password: password, Name: name } = data ?? {
      Password: "",
      Name: "",
    };
    reply.send(
      JSON.stringify(
        fetch(`http://localhost:8001/user?name=${name}&password=${password}`)
      )
    );
  };

const postCreateUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: FromSchema<typeof namePw>;
    }>,
    reply: FastifyReply
  ) => {
    if (
      (await sequelize.models["User"]?.count({
        where: { name: body.name },
      })) !== 0
    )
      return reply.status(Codes.AlreadyExists).send(
        JSON.stringify({
          message: `User "${body.name}" already exists.`,
        })
      );

    try {
      const createdPw = await bcrypt.hash(body.password, 10),
        createdToken = await bcrypt.hash(
          createdPw + (await bcrypt.hash(Date.now().toString(), 10)),
          10
        );

      const {
        Name: name,
        Password: password,
        Token: token,
        Projects: projects,
        Communities: communities,
        Image: image,
        createdAt,
        updatedAt,
      } = (await sequelize.model("User")?.create({
        name: body.name,
        projects: null,
        communities: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: createdPw,
        token: createdToken,
      })) as User;

      return reply.status(Codes.Successful).send(
        JSON.stringify({
          user: {
            name,
            password,
            token,
            projects,
            communities,
            image,
            createdAt,
            updatedAt,
          },
        })
      );
    } catch (e) {
      return reply.status(Codes.Successful).send(JSON.stringify(e));
    }
  };

const deleteUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: FromSchema<typeof namePw>;
    }>,
    reply: FastifyReply
  ): Promise<any> => {
    const data = (await sequelize.model("User")?.findOne({
      where: { name: body.name },
    })) as User;
    if (data === null)
      return reply.status(Codes.NotFound).send(
        JSON.stringify({
          message: `User "${body.name}" not found.`,
        })
      );

    if (!(await bcrypt.compare(body.password, data.Password)))
      return reply.status(Codes.Forbidden).send(
        JSON.stringify({
          message: `No permission to delete ${body.name}.`,
        })
      );

    await sequelize.models["User"]?.destroy({
      where: { name: body.name },
    });
    return reply.status(Codes.Successful).send(
      JSON.stringify({
        message: `User "${body.name}" was successfully deleted.`,
      })
    );
  };

const initUserRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app
    .get("/users", getUsersHandler(sequelize))
    .get<{ Querystring: { name: string; password: string } }>(
      "/user",
      {
        schema: {
          querystring: {
            name: { type: "string" },
            password: { type: "string" },
          },
          response: {
            [Codes.Successful]: {
              type: "object",
              properties: {
                name: { type: "string" },
                communities: { type: "object" },
                projects: { type: "object" },
                image: { type: "string" },
                password: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
      getUserHandler(sequelize)
    )
    .get(
      "/userByToken",
      {
        schema: {
          querystring: {
            token: { type: "string" },
          },
          response: {
            [Codes.Successful]: {
              type: "object",
              properties: {
                name: { type: "string" },
                communities: { type: "object" },
                projects: { type: "object" },
                image: { type: "string" },
                password: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
      getUserWithTokenHandler(sequelize)
    )
    .post<{
      Body: FromSchema<typeof namePw>;
    }>(
      "/createUser",
      {
        schema: {
          body: namePw,
          response: {
            [Codes.Successful]: {
              type: "object",
              properties: {
                name: { type: "string" },
                password: { type: "string" },
                token: { type: "string" },
                communities: { type: "object" },
                projects: { type: "object" },
                image: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
      postCreateUserHandler(sequelize)
    )
    .delete<{
      Body: FromSchema<typeof namePw>;
    }>(
      "/deleteUser",
      {
        schema: {
          body: namePw,
          response: {
            [Codes.Successful]: {
              type: "object",
              properties: {
                name: { type: "string" },
                password: { type: "string" },
                communities: { type: "object" },
                projects: { type: "object" },
                image: { type: "string" },
                createdAt: { type: "string" },
                updatedAt: { type: "string" },
              },
            },
          },
        },
      },
      deleteUserHandler(sequelize)
    );
};
export default initUserRoutes;
