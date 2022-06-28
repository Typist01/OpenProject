"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProjectHandler = (_sequelize) => (req, res) => {
    console.log(req.query);
    res.status(200).send("👍");
};
// const projectSearchHandler =
//   (_sequelize: Sequelize) => (req: FastifyRequest, res: FastifyReply) => {
//     console.log(req.query);
//     res.status(200).send("👍");
//   };
const initProjectRoutes = (app, sequelize) => {
    app.route({
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
    app.route({
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
exports.default = initProjectRoutes;
