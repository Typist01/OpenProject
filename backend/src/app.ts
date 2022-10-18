import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import initUserRoutes from "./routes/users";
import initProjectRoutes from "./routes/projects";
import User from "./models/User";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
  const sequelize = new Sequelize(
    process.env["DATABASE"] as string,
    process.env["DB_USERNAME"] as string,
    process.env["PASSWORD"],
    {
      host: "127.0.0.1",
      dialect: "mysql",
      dialectModule: await import("mysql2"),
      models: [User],
    }
  );
  sequelize.addModels([__dirname + "/models/User.ts"]);
  sequelize.addModels([__dirname + "/models/Project.ts"]);
  const app = fastify();
  app.register(cors);

  initUserRoutes(app, sequelize);
  initProjectRoutes(app, sequelize);

  app.get(
    "/",
    async (req: FastifyRequest, res: FastifyReply): Promise<Response> => {
      return res.status(200).send(
        JSON.stringify({
          message: req.ip,
        })
      );
    }
  );

  app.listen({ port: 8001 }, async (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);

    await sequelize.sync();
  });
})();
