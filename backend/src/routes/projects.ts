import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import Project from "../models/Project";
import { FromSchema } from "json-schema-to-ts";
import { Codes } from "../types";

const getProjectsHandler =
  (sequelize: Sequelize) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(Codes.Successful).send(
      JSON.stringify(
        ((await sequelize.models["Project"]?.findAll()) as Project[])?.map(
          p => ({
            name: p.name,
            image: p.image,
            description: p.description,
            createdAt: p.createdAt,
          })
        )
      )
    );
  };

const getProjectByNameHandler =
  (sequelize: Sequelize) =>
  async (
    {
      query,
    }: FastifyRequest<{
      Querystring: { name: string; owner: string };
    }>,
    reply: FastifyReply
  ) => {
    if (await sequelize.model("User")?.count({ where: { name: query.owner } }))
      return reply.status(Codes.NotFound).send({
        message: `User "${query.owner}" could not be found.`,
        project: "No data.",
      });

    const project = (await sequelize.model("Project")?.findOne({
      where: { name: query.name, owner: query.owner },
    })) as Project;

    if (project === null)
      return reply.status(Codes.NotFound).send({
        message: `Project "${query.name}" created by "${query.owner}" could not be found.`,
        project: "No data.",
      });

    return reply.status(Codes.Successful).send({
      project: {
        name: project.name,
        owner: project.owner,
        image: project.image,
        isPrivate: project.isPrivate,
      },
    });
  };

const getProjectByIdHandler =
  (sequelize: Sequelize) =>
  async (
    {
      query,
    }: FastifyRequest<{
      Querystring: { id: string };
    }>,
    reply: FastifyReply
  ): Promise<any> => {
    const data = (await sequelize.model("Project")?.findOne({
      where: { id: query.id },
    })) as Project | null;

    if (data === null)
      return reply.status(Codes.NotFound).send({
        message: `Project with id "${query.id}" could not be found.`,
        project: "No data.",
      });

    return reply.status(Codes.Successful).send({
      project: {},
    });
  };

const idSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
} as const;

const deleteProjectHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: FromSchema<typeof idSchema>;
    }>,
    reply: FastifyReply
  ) => {
    const data = (await sequelize.model("Project")?.findOne({
      where: { id: body.id },
    })) as Project;
    if (data === null)
      return reply.status(Codes.NotFound).send(
        JSON.stringify({
          message: `User "${body.id}" not found.`,
        })
      );
    return reply.status(Codes.Successful).send(
      JSON.stringify({
        message: `Project "${body.id}" was successfully deleted.`,
      })
    );
  };

const initProjectRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app
    .get("/users", getProjectsHandler(sequelize))
    .get<{ Querystring: { name: string; owner: string } }>(
      "/user",
      {
        schema: {
          querystring: {
            name: { type: "string" },
            owner: { type: "string" },
          },
          response: {
            [Codes.Successful]: {
              type: "object",
              properties: {
                name: { type: "string" },
                owner: { type: "object" },
                image: { type: "string" },
                isPrivate: { type: "string" },
              },
            },
          },
        },
      },
      getProjectByNameHandler(sequelize)
    )
    .get<{ Querystring: { id: string } }>(
      "/user",
      {
        schema: {
          querystring: {
            id: { type: "number" },
          },
          response: {
            [Codes.Successful]: {
              type: "object",
            },
          },
        },
      },
      getProjectByIdHandler(sequelize)
    )
    // .post<{
    //   Body: FromSchema<typeof namePw>;
    // }>(
    //   "/createUser",
    //   {
    //     schema: {
    //       body: namePw,
    //       response: {
    //         [Codes.Successful]: {
    //           type: "object",
    //           properties: {
    //             name: { type: "string" },
    //             password: { type: "string" },
    //             token: { type: "string" },
    //             communities: { type: "object" },
    //             projects: { type: "object" },
    //             image: { type: "string" },
    //             createdAt: { type: "string" },
    //             updatedAt: { type: "string" },
    //           },
    //         },
    //       },
    //     },
    //   },
    //   postCreateUserHandler(sequelize)
    // )
    .delete<{
      Body: FromSchema<typeof idSchema>;
    }>(
      "/deleteUser",
      {
        schema: {
          body: idSchema,
          response: {
            [Codes.Successful]: {
              type: "object",
            },
          },
        },
      },
      deleteProjectHandler(sequelize)
    );
};
export default initProjectRoutes;
