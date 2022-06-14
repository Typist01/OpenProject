import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize";
import { initUserRoutes } from "./routes/users";
import { initProjectRoutes } from "./routes/projects";

// const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  "OpenProject" as string,
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
  console.log(`Server listening at ${address}`);
});
