import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { DataTypes, Sequelize } from "sequelize";
import initUserRoutes from "./routes/users";
import initProjectRoutes from "./routes/projects";
import User from "./models/User";
import Project from "./models/Project";
import Community from "./models/Community";
import Task from "./models/Task";
import TaskSubmission from "./models/TaskSubmission";
import Submission from "./models/Submission";

const sequelize = new Sequelize(
  "github_2" as string,
  "root" as string,
  "OpenProject4$" as string,
  {
    host: "localhost" as string,
    dialect: "mysql",
  }
);
const app = fastify();
initUserRoutes(app, sequelize);
initProjectRoutes(app, sequelize);

app.get(
  "/",
  async (_req: FastifyRequest, res: FastifyReply): Promise<Response> => {
    return res.status(200).send({
      message: `Endpoints available at http://localhost:${process.env["PORT"]}`,
    });
  }
);
(async () => {
  await sequelize.sync();
})();

app.listen({ port: 8001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  User.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(30),
        allowNull: false,
      },
      image: DataTypes.TEXT,
      token: {
        type: new DataTypes.STRING(22),
        allowNull: false,
        primaryKey: true,
      },
      communities: new DataTypes.ARRAY(DataTypes.STRING(22)),
      projects: new DataTypes.ARRAY(DataTypes.STRING(22)),
      password: {
        type: new DataTypes.STRING(72),
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "users",
      sequelize,
    }
  );
  Community.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      subscribers: {
        type: new DataTypes.ARRAY(DataTypes.STRING(22)),
        allowNull: false,
      },
      projects: new DataTypes.ARRAY(DataTypes.STRING(22)),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "communities",
      sequelize,
    }
  );
  Project.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contributors: {
        type: new DataTypes.ARRAY(DataTypes.STRING(22)),
        allowNull: false,
      },
      tasks: new DataTypes.ARRAY(DataTypes.STRING(22)),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "projects",
      sequelize,
    }
  );
  Task.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: new DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prerequisites: new DataTypes.ARRAY(DataTypes.TEXT),
      files: new DataTypes.ARRAY(DataTypes.TEXT),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "tasks",
      sequelize,
    }
  );
  Submission.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      userID: {
        type: new DataTypes.STRING(22),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      images: new DataTypes.ARRAY(DataTypes.TEXT),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "tasks",
      sequelize,
    }
  );
  TaskSubmission.init(
    {
      id: {
        type: new DataTypes.STRING(22),
        primaryKey: true,
        allowNull: false,
      },
      taskID: {
        type: new DataTypes.STRING(22),
        allowNull: false,
      },
      userID: {
        type: new DataTypes.STRING(22),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: "tasks",
      sequelize,
    }
  );
  console.log(`Server listening at ${address}`);
});
