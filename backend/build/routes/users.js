"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const types_1 = require("../types");
const namePw = {
    type: "object",
    properties: {
        name: { type: "string" },
        password: { type: "string" },
    },
    required: ["name", "password"],
};
const getUsersHandler = (sequelize) => async (_request, reply) => {
    reply.status(types_1.Codes.Successful).send(JSON.stringify((await sequelize.models["User"]?.findAll())?.map(u => ({
        name: u.Name,
        image: u.Image,
        communities: u.Communities,
        projects: u.Projects,
        createdAt: u.createdAt,
    }))));
};
const getUserHandler = (sequelize) => async ({ query, }, reply) => {
    console.log(query.name);
    const data = (await sequelize.models["User"]?.findOne({
        where: { name: query.name },
    }));
    try {
        if (data !== null) {
            const { Name: name, Image: image, Password: password, Projects: projects, Communities: communities, createdAt, updatedAt, Token: token, } = data;
            if (!(await bcrypt_1.default.compare(query.password, password))) {
                return reply.status(types_1.Codes.Successful).send(JSON.stringify({
                    allowed: false,
                    user: {
                        name,
                        image,
                        createdAt,
                    },
                }, null, 4));
            }
            else {
                return reply.status(types_1.Codes.Successful).send(JSON.stringify({
                    allowed: true,
                    user: {
                        name,
                        password,
                        projects,
                        communities,
                        image,
                        createdAt,
                        updatedAt,
                        token,
                    },
                }, null, 4));
            }
        }
        else
            return reply.status(types_1.Codes.Successful).send(JSON.stringify({
                allowed: false,
                message: "Could not find user.",
                user: "No data.",
            }, null, 4));
    }
    catch (e) {
        console.log(e);
        return reply.status(types_1.Codes.Successful).send({
            allowed: false,
            message: "Just an error",
            user: "No data",
        });
    }
};
const getUserWithTokenHandler = (sequelize) => async ({ query, }, reply) => {
    const data = (await sequelize.model("User")?.findOne({
        where: { name: query.token },
    }));
    const { Password: password, Name: name } = data ?? {
        Password: "",
        Name: "",
    };
    reply.send(JSON.stringify(fetch(`http://localhost:8001/user?name=${name}&password=${password}`)));
};
const postCreateUserHandler = (sequelize) => async ({ body, }, reply) => {
    if ((await sequelize.models["User"]?.count({
        where: { name: body.name },
    })) !== 0)
        return reply.status(types_1.Codes.AlreadyExists).send(JSON.stringify({
            message: `User "${body.name}" already exists.`,
        }));
    try {
        const createdPw = await bcrypt_1.default.hash(body.password, 10), createdToken = await bcrypt_1.default.hash(createdPw + (await bcrypt_1.default.hash(Date.now().toString(), 10)), 10);
        const { Name: name, Password: password, Token: token, Projects: projects, Communities: communities, Image: image, createdAt, updatedAt, } = (await sequelize.model("User")?.create({
            name: body.name,
            projects: null,
            communities: null,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: createdPw,
            token: createdToken,
        }));
        return reply.status(types_1.Codes.Successful).send(JSON.stringify({
            user: {
                name,
                password,
                token,
                projects,
                communities,
                image,
                createdAt,
                updatedAt,
            },
        }));
    }
    catch (e) {
        return reply.status(types_1.Codes.Successful).send(JSON.stringify(e));
    }
};
const deleteUserHandler = (sequelize) => async ({ body, }, reply) => {
    const data = (await sequelize.model("User")?.findOne({
        where: { name: body.name },
    }));
    if (data === null)
        return reply.status(types_1.Codes.NotFound).send(JSON.stringify({
            message: `User "${body.name}" not found.`,
        }));
    if (!(await bcrypt_1.default.compare(body.password, data.Password)))
        return reply.status(types_1.Codes.Forbidden).send(JSON.stringify({
            message: `No permission to delete ${body.name}.`,
        }));
    await sequelize.models["User"]?.destroy({
        where: { name: body.name },
    });
    return reply.status(types_1.Codes.Successful).send(JSON.stringify({
        message: `User "${body.name}" was successfully deleted.`,
    }));
};
const initUserRoutes = (app, sequelize) => {
    app
        .get("/users", getUsersHandler(sequelize))
        .get("/user", {
        schema: {
            querystring: {
                name: { type: "string" },
                password: { type: "string" },
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
    }, getUserHandler(sequelize))
        .get("/userByToken", {
        schema: {
            querystring: {
                token: { type: "string" },
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
    }, getUserWithTokenHandler(sequelize))
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
exports.default = initUserRoutes;
