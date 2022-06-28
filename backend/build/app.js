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
const projects_1 = __importDefault(require("./routes/projects"));
// import User from "./models/User";
(async () => {
    const sequelize = new sequelize_typescript_1.Sequelize("github_2", "root", "OpenProject4$", {
        host: "localhost",
        dialect: "mysql",
        dialectModule: await Promise.resolve().then(() => __importStar(require("mysql2"))),
    });
    sequelize.addModels([__dirname + "/**/models/User.ts"]);
    sequelize.addModels([__dirname + "/**/models/Project.ts"]);
    const app = (0, fastify_1.default)();
    (0, users_1.default)(app, sequelize);
    (0, projects_1.default)(app, sequelize);
    app.get("/", async (req, res) => {
        return res.status(200).send({
            message: req,
        });
    });
    app.listen({ port: 8001 }, async (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        // User.init(
        //   {
        //     name: {
        //       type: new DataTypes.STRING(30),
        //       primaryKey: true,
        //       allowNull: false,
        //     },
        //     image: DataTypes.TEXT,
        //     communities: DataTypes.JSON(),
        //     projects: DataTypes.JSON(),
        //     password: {
        //       type: new DataTypes.STRING(72),
        //       allowNull: false,
        //     },
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "users",
        //     sequelize,
        //   }
        // );
        // Community.init(
        //   {
        //     name: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //       primaryKey: true,
        //     },
        //     description: {
        //       type: DataTypes.TEXT,
        //       allowNull: false,
        //     },
        //     subscribers: {
        //       type: DataTypes.JSON(),
        //       allowNull: false,
        //     },
        //     projects: DataTypes.JSON(),
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "communities",
        //     sequelize,
        //   }
        // );
        // Project.init(
        //   {
        //     name: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //       primaryKey: true,
        //     },
        //     description: {
        //       type: DataTypes.TEXT,
        //       allowNull: false,
        //     },
        //     contributors: {
        //       type: new DataTypes.ARRAY(DataTypes.STRING(22)),
        //       allowNull: false,
        //     },
        //     tasks: new DataTypes.ARRAY(DataTypes.STRING(22)),
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "projects",
        //     sequelize,
        //   }
        // );
        // Task.init(
        //   {
        //     projectName: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     name: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     description: {
        //       type: DataTypes.TEXT,
        //       allowNull: false,
        //     },
        //     prerequisites: new DataTypes.ARRAY(DataTypes.TEXT),
        //     files: new DataTypes.ARRAY(DataTypes.TEXT),
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "tasks",
        //     sequelize,
        //   }
        // );
        // Submission.init(
        //   {
        //     name: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     userName: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     projectName: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     content: {
        //       type: DataTypes.TEXT,
        //       allowNull: false,
        //     },
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "tasks",
        //     sequelize,
        //   }
        // );
        // TaskSubmission.init(
        //   {
        //     id: {
        //       type: new DataTypes.STRING(22),
        //       allowNull: false,
        //     },
        //     taskName: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     userName: {
        //       type: new DataTypes.STRING(30),
        //       allowNull: false,
        //     },
        //     content: {
        //       type: DataTypes.TEXT,
        //       allowNull: false,
        //     },
        //     createdAt: DataTypes.DATE,
        //     updatedAt: DataTypes.DATE,
        //   },
        //   {
        //     tableName: "tasks",
        //     sequelize,
        //   }
        // );
        console.log(`Server listening at ${address}`);
        await sequelize.sync();
    });
})();
