import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize";
import User from "../models/User";

const getUsersHandler =
  () => async (_request: FastifyRequest, reply: FastifyReply) =>
    reply.status(200).send("Test");
const getUserHandler =
  () =>
  async (
    request: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ) =>
    reply
      .status(200)
      .send(await User.findOne({ where: { name: request.query.name } }));

const initUserRoutes = (app: FastifyInstance, _sequelize: Sequelize) => {
  app.route({
    method: "GET",
    url: "/users",
    handler: getUsersHandler(),
  });
  app.route<{ Querystring: { name: string } }>({
    method: "GET",
    url: "/users",
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
    handler: getUserHandler(),
  });
};
export default initUserRoutes;
