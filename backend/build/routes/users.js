"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserRoutes = void 0;
const getUserHandler = (_sequelize) => () => { };
const initUserRoutes = (app, sequelize) => {
    app.route({
        method: 'GET',
        url: '/users',
        handler: getUserHandler(sequelize)
    });
};
exports.initUserRoutes = initUserRoutes;
