import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import bcrypt from "bcrypt";

const getUsersHandler =
  (sequelize: Sequelize) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    // console.log(await sequelize.models["User"]?.findAll());
    reply.status(200).send(await sequelize.models["User"]?.findAll());
  };
const getUserHandler =
  (sequelize: Sequelize) =>
  async (
    request: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ) =>
    reply.status(200).send(
      await sequelize.models["User"]?.findOne({
        where: { name: request.query.name },
      })
    );
const postCreateUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      query: req,
    }: FastifyRequest<{
      Querystring: {
        name: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) =>
    reply.status(200).send(
      await sequelize.models["User"]?.findOrCreate({
        where: { name: req.name },
        defaults: {
          name: req.name,
          projects: null,
          communities: null,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: await bcrypt.hash(req.password, 10),
        },
      })
    );

const initUserRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app
    .get("/users", getUsersHandler(sequelize))
    .get<{ Querystring: { name: string } }>(
      "/user",
      {
        schema: {
          querystring: {
            name: { type: "string" },
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
      Querystring: {
        name: string;
        projects: any;
        communities: any;
        image: string;
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
      postCreateUserHandler(sequelize)
    );
};
export default initUserRoutes;
