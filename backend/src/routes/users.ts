import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import bcrypt from "bcrypt";

const getUsersHandler =
  (sequelize: Sequelize) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send(
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
    request: FastifyRequest<{
      Querystring: { name: string; password: string };
    }>,
    reply: FastifyReply
  ): Promise<any> => {
    const data = (await sequelize.models["User"]?.findOne({
      where: { name: request.query.name },
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
        } = data;
        if (!(await bcrypt.compare(request.query.password, password))) {
          console.log(1);
          return reply.status(200).send(
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
          reply.status(200).send(
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
                },
              },
              null,
              4
            )
          );
        }
      } else
        reply.status(200).send(
          JSON.stringify(
            {
              allowed: false,
              message: "No content.",
              user: "No data",
            },
            null,
            4
          )
        );
    } catch (e: any) {
      console.log(e);
      reply.status(200).send({
        message: "Just an error",
        user: "No data",
      });
    }
  };

const postCreateUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: {
        name: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    if (
      (await sequelize.models["User"]?.findOne({
        where: { name: body.name },
      })) !== null
    )
      reply.status(401).send(
        JSON.stringify({
          message: await fetch(
            `http://localhost:8001/user?name=${body.name}&password=${body.password}`
          ),
        })
      );
    const {
      Name: name,
      Password: password,
      Projects: projects,
      Communities: communities,
      Image: image,
      createdAt,
      updatedAt,
    } = (await sequelize.models["User"]?.create({
      where: { name: body.name },
      defaults: {
        name: body.name,
        projects: null,
        communities: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: await bcrypt.hash(body.password, 10),
      },
    })) as User;
    reply.status(200).send(
      JSON.stringify({
        user: {
          name,
          password,
          projects,
          communities,
          image,
          createdAt,
          updatedAt,
        },
      })
    );
  };

const deleteUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: {
        name: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const { Name: name, Password: password } = (await sequelize.models[
      "User"
    ]?.findOne({
      where: { name: body.name, password: body.password },
    })) as User;
    if (bcrypt.compareSync(body.password, password))
      reply.status(403).send(
        JSON.stringify({
          message: `Forbidden.`,
        })
      );
    else {
      await sequelize.models["User"]?.destroy({
        where: { name: body.name, password: body.password },
      });
      reply.status(200).send(
        JSON.stringify({
          message: `"${name}" was successfully deleted.`,
        })
      );
    }
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
            200: {
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
    .post<{
      Body: {
        name: string;
        password: string;
      };
    }>(
      "/createUser",
      {
        schema: {
          querystring: {
            name: { type: "string" },
            password: { type: "string" },
          },
          response: {
            200: {
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
      postCreateUserHandler(sequelize)
    )
    .delete<{
      Body: {
        name: string;
        password: string;
      };
    }>(
      "/deleteUser",
      {
        schema: {
          querystring: {
            name: { type: "string" },
            password: { type: "string" },
          },
          response: {
            200: {
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
