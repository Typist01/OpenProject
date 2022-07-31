"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = __importDefault(require("./routes/users"));
// import initProjectRoutes from "./routes/projects";
const User_1 = __importDefault(require("./models/User"));
const cors_1 = __importDefault(require("@fastify/cors"));
(async () => {
    const sequelize = new sequelize_typescript_1.Sequelize("openproject", "root", "OpenProject4$", {
        host: "localhost",
        dialect: "mysql",
        dialectModule: await Promise.resolve().then(() => __importStar(require("mysql2"))),
        models: [User_1.default],
    });
    sequelize.addModels([__dirname + "/models/User.ts"]);
    sequelize.addModels([__dirname + "/models/Project.ts"]);
    const app = (0, fastify_1.default)();
    app.register(cors_1.default);
    (0, users_1.default)(app, sequelize);
    app.get("/", async (req, res) => {
        return res.status(200).send(JSON.stringify({
            message: req.ip,
        }));
    });
    app.listen({ port: 8001 }, async (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
        await sequelize.sync();
    });
})();
