"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCommunities = exports.initCommunityRoutes = void 0;
// find data for a specific community with identifier id
const getCommunityHandler = (_sequelize) => (req, res) => {
    console.log(req.query);
    res.status(200).send("👍");
};
const initCommunityRoutes = (app, sequelize) => {
    app.route({
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
exports.initCommunityRoutes = initCommunityRoutes;
// Search for communities with a search string, searchQuery
const searchCommunities = (app, sequelize) => {
    app.route({
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
exports.searchCommunities = searchCommunities;
