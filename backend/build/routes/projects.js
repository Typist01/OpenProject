"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initProjectRoutes = void 0;
const getProjectHandler = (_sequelize) => (req, res) => {
    console.log(req.query);
    res.status(200).send("👍");
};
const initProjectRoutes = (app, sequelize) => {
    app.route({
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
exports.initProjectRoutes = initProjectRoutes;
