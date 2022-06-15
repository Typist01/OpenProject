"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sequelize_1 = require("sequelize");
const users_1 = require("./routes/users");
const projects_1 = require("./routes/projects");
// const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new sequelize_1.Sequelize("OpenProject", "root", "OpenProject4$", {
    host: "localhost",
    dialect: "mysql",
});
const app = (0, fastify_1.default)();
(0, users_1.initUserRoutes)(app, sequelize);
(0, projects_1.initProjectRoutes)(app, sequelize);
app.get("/", async (_req, res) => {
    return res.status(200).send({
        message: `Endpoints available at http://localhost:${process.env["PORT"]}`,
    });
});
(async () => {
    await sequelize.sync();
})();
app.listen({ port: 8001 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
