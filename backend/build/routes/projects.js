"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const namePw = {
    type: "object",
    properties: {
        name: { type: "string" },
        password: { type: "string" },
    },
    required: ["name", "password"],
};
const getProjectsHandler = (sequelize) => async (_request, reply) => {
    reply.status(types_1.Codes.Successful).send(JSON.stringify((await sequelize.models["Project"]?.findAll())?.map(p => ({
        name: p.name,
        image: p.image,
        description: p.description,
        createdAt: p.createdAt,
    }))));
};
const getProjectByNameHandler = (sequelize) => async ({ query, }, reply) => {
    if (await sequelize.model("User")?.count({ where: { name: query.owner } }))
        return reply.status(types_1.Codes.NotFound).send({
            message: `User "${query.owner}" could not be found.`,
            project: "No data.",
        });
    const project = (await sequelize.model("Project")?.findOne({
        where: { name: query.name, owner: query.owner },
    }));
    if (project === null)
        return reply.status(types_1.Codes.NotFound).send({
            message: `Project "${query.name}" created by "${query.owner}" could not be found.`,
            project: "No data.",
        });
    return reply.status(types_1.Codes.Successful).send({
        project: {
            name: project.name,
            owner: project.owner,
            image: project.image,
            isPrivate: project.isPrivate,
        },
    });
};
const getProjectByIdHandler = (sequelize) => async ({ query, }, reply) => {
    const data = (await sequelize.model("Project")?.findOne({
        where: { id: query.id },
    }));
    if (data === null)
        return reply.status(types_1.Codes.NotFound).send({
            message: `Project with id "${query.id}" could not be found.`,
            project: "No data.",
        });
    return reply.status(types_1.Codes.Successful).send({
        project: {},
    });
};
const initProjectRoutes = (app, sequelize) => {
    app
        .get("/users", getProjectsHandler(sequelize))
        .get("/user", {
        schema: {
            querystring: {
                name: { type: "string" },
                owner: { type: "string" },
            },
            response: {
                [types_1.Codes.Successful]: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        owner: { type: "object" },
                        image: { type: "string" },
                        isPrivate: { type: "string" },
                    },
                },
            },
        },
    }, getProjectByNameHandler(sequelize))
        .get("/user", {
        schema: {
            querystring: {
                name: { type: "string" },
                owner: { type: "string" },
            },
            response: {
                [types_1.Codes.Successful]: {
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
    }, getProjectByIdHandler(sequelize))
        .post("/createUser", {
        schema: {
            body: namePw,
            response: {
                [types_1.Codes.Successful]: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        password: { type: "string" },
                        token: { type: "string" },
                        communities: { type: "object" },
                        projects: { type: "object" },
                        image: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                    },
                },
            },
        },
    }, postCreateUserHandler(sequelize))
        .delete("/deleteUser", {
        schema: {
            body: namePw,
            response: {
                [types_1.Codes.Successful]: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        password: { type: "string" },
                        communities: { type: "object" },
                        projects: { type: "object" },
                        image: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                    },
                },
            },
        },
    }, deleteUserHandler(sequelize));
};
exports.default = initProjectRoutes;
