import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import initUserRoutes from "./routes/users";
import initProjectRoutes from "./routes/projects";
// import User from "./models/User";

(async () => {
  const sequelize = new Sequelize("github_2", "root", "OpenProject4$", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: await import("mysql2"),
  });
  sequelize.addModels([__dirname + "/**/models/User.ts"]);
  sequelize.addModels([__dirname + "/**/models/Project.ts"]);
  const app = fastify();
  initUserRoutes(app, sequelize);
  initProjectRoutes(app, sequelize);

  app.get(
    "/",
    async (req: FastifyRequest, res: FastifyReply): Promise<Response> => {
      return res.status(200).send({
        message: req,
      });
    }
  );

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
