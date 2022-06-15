import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Sequelize } from "sequelize";

// find data for a specific community with identifier id
const getCommunityHandler =
  (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
    console.log(req.query);
    res.status(200).send("👍");
  };
export const initCommunityRoutes = (
  app: FastifyInstance,
  sequelize: Sequelize
) => {
  app.route<{ QueryString: { id: string }; Headers: {} }>({
    method: "GET",
    url: "/communities/:id",
    handler: getCommunityHandler(sequelize),
    schema: {
      querystring: {
        title: "Community Querystring Schema",
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

// Search for communities with a search string, searchQuery
export const searchCommunities = (
  app: FastifyInstance,
  sequelize: Sequelize
) => {
  app.route<{ QueryString: { searchQuery: string }; Headers: {} }>({
    method: "GET",
    url: "/communities/:searchQuery",
    handler: getCommunityHandler(sequelize),
    schema: {
      querystring: {
        title: "Community Searchstring Schema",
        type: "object",
        properties: {
          searchQuery: { type: "string" },
        },
        additionalProperties: false,
        required: ["searchQuery"],
      },
    },
  });
};
