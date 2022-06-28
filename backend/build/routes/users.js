"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsersHandler = (sequelize) => async (_request, reply) => {
    // console.log(await sequelize.models["User"]?.findAll());
    reply.status(200).send(await sequelize.models["User"]?.findAll());
};
const getUserHandler = (sequelize) => async (request, reply) => reply.status(200).send(await sequelize.models["User"]?.findOne({
    where: { name: request.query.name },
}));
const postCreateUserHandler = (sequelize) => async ({ query: req, }, reply) => reply.status(200).send(await sequelize.models["User"]?.findOrCreate({
    where: { name: req.name },
    defaults: {
        name: req.name,
        projects: null,
        communities: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: await bcrypt_1.default.hash(req.password, 10),
    },
}));
const initUserRoutes = (app, sequelize) => {
    app
        .get("/users", getUsersHandler(sequelize))
        .get("/user", {
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
    }, getUserHandler(sequelize))
        .post("/createUser", {
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
    }, postCreateUserHandler(sequelize));
};
exports.default = initUserRoutes;
