import fastify from 'fastify'
import { Sequelize } from 'sequelize';
import { initUserRoutes } from "./routes/users";

const sequelize = new Sequelize(process.env['URI'] as string);
const app = fastify();
initUserRoutes(app, sequelize);

(async () => {
    await sequelize.sync();
})();
app.listen({ port: Number(process.env['PORT']) }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});