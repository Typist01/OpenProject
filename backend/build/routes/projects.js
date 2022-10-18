"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
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
const idSchema = {
    type: "object",
    properties: {
        id: { type: "number" },
    },
    required: ["id"],
};
const deleteProjectHandler = (sequelize) => async ({ body, }, reply) => {
    const data = (await sequelize.model("Project")?.findOne({
        where: { id: body.id },
    }));
    if (data === null)
        return reply.status(types_1.Codes.NotFound).send(JSON.stringify({
            message: `User "${body.id}" not found.`,
        }));
    return reply.status(types_1.Codes.Successful).send(JSON.stringify({
        message: `Project "${body.id}" was successfully deleted.`,
    }));
};
const initProjectRoutes = (app, sequelize) => {
    app
        .get("/projects", getProjectsHandler(sequelize))
        .get("/project", {
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
        .get("/projectById", {
        schema: {
            querystring: {
                id: { type: "number" },
            },
            response: {
                [types_1.Codes.Successful]: {
                    type: "object",
                },
            },
        },
    }, getProjectByIdHandler(sequelize))
        // .post<{
        //   Body: FromSchema<typeof namePw>;
        // }>(
        //   "/createUser",
        //   {
        //     schema: {
        //       body: namePw,
        //       response: {
        //         [Codes.Successful]: {
        //           type: "object",
        //           properties: {
        //             name: { type: "string" },
        //             password: { type: "string" },
        //             token: { type: "string" },
        //             communities: { type: "object" },
        //             projects: { type: "object" },
        //             image: { type: "string" },
        //             createdAt: { type: "string" },
        //             updatedAt: { type: "string" },
        //           },
        //         },
        //       },
        //     },
        //   },
        //   postCreateUserHandler(sequelize)
        // )
        .delete("/deleteProject", {
        schema: {
            body: idSchema,
            response: {
                [types_1.Codes.Successful]: {
                    type: "object",
                },
            },
        },
    }, deleteProjectHandler(sequelize));
};
exports.default = initProjectRoutes;
