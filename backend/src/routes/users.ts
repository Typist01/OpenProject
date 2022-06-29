import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import bcrypt from "bcrypt";

const getUsersHandler =
  (sequelize: Sequelize) =>
  async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send(await sequelize.models["User"]?.findAll());
  };
const getUserHandler =
  (sequelize: Sequelize) =>
  async (
    request: FastifyRequest<{ Querystring: { name: string } }>,
    reply: FastifyReply
  ) =>
    reply.status(200).send(
      await sequelize.models["User"]?.findOne({
        where: { name: request.query.name },
      })
    );
// curl localhost:80001/users
// ^ returns an empty but as soon as Imma create one user, it will show it up. just wait
// curl -X POST localhost:8001/createUser?name=Test&password=test123 lemme do it. u gonna do that one above
// wait, the above one couldn't get found
// http://localhost:8001/users returns empty array [], that command is for making post request in console? that is for getting a list of every user
// does curl work in powershell? it says powershell on the right
// liveshare is bugging all the time bruuuuuh
// wait it's
// curl -X POST -H "Content-Type: application/json" -d '{"name": "Test", "password": "test123"}' localhost:8001/createUser
// ok it works, but the url is invalid for any reasons
// i have to go soon, shall we continue tomorrow? ok
// but u could only do curl -X POST -H "Content-Type: application/json" -d '{"name": "Test", "password": "test123"}' localhost:8001/createUser once?
// and then curl localhost:8001/users once? back
// it works! nice let's continue tomorrow okay insha'Allah may Allahu ta'ala bless u akhi and you as well ameen
// السلام عليكم ورحمة الله وبركاته
// wa'alaikumassalam warahmatullahi wabarakatuh

const postCreateUserHandler =
  (sequelize: Sequelize) =>
  async (
    {
      body,
    }: FastifyRequest<{
      Body: {
        name: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) => {
    const {
      name,
      password,
      projects,
      communities,
      image,
      createdAt,
      updatedAt,
    } = (await sequelize.models["User"]?.findOrCreate({
      where: { name: body.name },
      defaults: {
        name: body.name,
        projects: null,
        communities: null,
        image: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: await bcrypt.hash(body.password, 10),
      },
    }))![0]! as User;
    reply.status(200).send(
      JSON.stringify({
        name,
        password,
        projects,
        communities,
        image,
        createdAt,
        updatedAt,
      })
    );
  };

const initUserRoutes = (app: FastifyInstance, sequelize: Sequelize) => {
  app
    .get("/users", getUsersHandler(sequelize))
    .get<{ Querystring: { name: string } }>(
      "/user",
      {
        schema: {
          querystring: {
            name: { type: "string" },
          },
          response: {
            200: {
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
      },
      getUserHandler(sequelize)
    )
    .post<{
      Body: {
        name: string;
        password: string;
      };
    }>(
      "/createUser",
      {
        schema: {
          querystring: {
            name: { type: "string" },
            password: { type: "string" },
          },
          response: {
            200: {
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
      },
      postCreateUserHandler(sequelize)
    );
};
export default initUserRoutes;
