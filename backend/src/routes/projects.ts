import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Sequelize } from "sequelize";

const getProjectHandler =
  (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
    console.log(req.query);
    res.status(200).send("👍");
  };
export const initProjectRoutes = (
  app: FastifyInstance,
  sequelize: Sequelize
) => {
  app.route<{ QueryString: { id: string }; Headers: {} }>({
    method: "GET",
    url: "/projects/:id",
    handler: getProjectHandler(sequelize),
    schema: {
      querystring: {
        title: "Querystring Schema",
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
        additionalProperties: false,
        required: ["username", "password"],
      },
    },
  });
};
