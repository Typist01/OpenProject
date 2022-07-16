import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import initUserRoutes from "./routes/users";
// import initProjectRoutes from "./routes/projects";
import User from "./models/User";
// import Project from "./models/Project";

(async () => {
  const sequelize = new Sequelize("github_2", "root", "OpenProject4$", {
    host: "localhost",
    dialect: "mysql",
    dialectModule: await import("mysql2"),
    models: [User], // , Project],
  });
  sequelize.addModels([__dirname + "/models/User.ts"]);
  sequelize.addModels([__dirname + "/models/Project.ts"]);
  const app = fastify();
  initUserRoutes(app, sequelize);
  // idk what's wrong, but it's here in the backend, try to do
  // initProjectRoutes(app, sequelize); wait Imma save the login page ok

  app.get(
    "/", // we can also go back to the commit on july 6th, wanna try that?
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
