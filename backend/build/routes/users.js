"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsersHandler = (sequelize) => async (_request, reply) => {
    reply.status(200).send(await sequelize.models["User"]?.findAll());
};
const getUserHandler = (sequelize) => async (request, reply) => {
    const { name, password, projects, communities, image, createdAt, updatedAt, } = (await sequelize.models["User"]?.findOne({
        where: { name: request.query.name },
    }));
    if (!(await bcrypt_1.default.compare(request.query.password, password)))
        return reply.status(200).send({
            allowed: "0",
            user: JSON.stringify({
                name,
                image,
                createdAt,
            }),
        });
    reply.status(200).send(JSON.stringify({
        allowed: "1",
        user: {
            name,
            password,
            projects,
            communities,
            image,
            createdAt,
            updatedAt,
        },
    }));
};
const postCreateUserHandler = (sequelize) => async ({ body, }, reply) => {
    if ((await sequelize.models["User"]?.findOne({
        where: { name: body.name },
    })) !== null)
        reply.status(401).send(JSON.stringify({
            message: await fetch(`http://localhost:8001/user?name=${body.name}&password=${body.password}`),
        }));
    const { name, password, projects, communities, image, createdAt, updatedAt, } = (await sequelize.models["User"]?.create({
        where: { name: body.name },
        defaults: {
            name: body.name,
            projects: null,
            communities: null,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: await bcrypt_1.default.hash(body.password, 10),
        },
    }));
    reply.status(200).send(JSON.stringify({
        user: {
            name,
            password,
            projects,
            communities,
            image,
            createdAt,
            updatedAt,
        },
    }));
};
const deleteUserHandler = (sequelize) => async ({ body, }, reply) => {
    const { name, password } = (await sequelize.models["User"]?.findOne({
        where: { name: body.name, password: body.password },
    }));
    if (bcrypt_1.default.compareSync(body.password, password))
        reply.status(403).send(JSON.stringify({
            message: `Forbidden.`,
        }));
    else {
        await sequelize.models["User"]?.destroy({
            where: { name: body.name, password: body.password },
        });
        reply.status(200).send(JSON.stringify({
            message: `"${name}" was successfully deleted.`,
        }));
    }
};
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
    }, postCreateUserHandler(sequelize))
        .delete("/deleteUser", {
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
exports.default = initUserRoutes;
