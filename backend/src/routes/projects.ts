import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Sequelize } from "sequelize";

const getProjectHandler: (sequelize: Sequelize) => () => void =
  (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
    req.
  };

export const initUserRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app.route({
    method: "GET",
    url: "/projects/:id",
    handler: getProjectHandler(sequelize),
  });
};
