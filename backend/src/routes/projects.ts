import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Sequelize } from "sequelize-typescript";

const getProjectHandler =
  (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
    console.log(req.query);
    res.status(200).send("👍");
  };
// const projectSearchHandler =
//   (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
//     console.log(req.query);
//     res.status(200).send("👍");
//   };

const initProjectRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app.route<{ QueryString: { id: string }; Headers: {} }>({
    method: "GET",
    url: "/projects/:id",
    handler: getProjectHandler(sequelize),
    schema: {
      querystring: {
        title: "Project Querystring Schema",
        type: "object",
        properties: {
          id: { type: "string" },
        },
        additionalProperties: false,
        required: ["id"],
      },
    },
  });
  app.route<{ QueryString: { id: string }; Headers: {} }>({
    method: "GET",
    url: "/community/:id/:",
    handler: getProjectHandler(sequelize),
    schema: {
      querystring: {
        title: "Project Querystring Schema",
        type: "object",
        properties: {
          id: { type: "string" },
        },
        additionalProperties: false,
        required: ["id"],
      },
    },
  });
};

export default initProjectRoutes;
