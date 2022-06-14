"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Project_1 = __importDefault(require("./Project"));
class User extends sequelize_1.Model {
    get Name() {
        return this.name;
    }
    get Id() {
        return this.id;
    }
    async getProjects() {
        return this.projects.map(p => Project_1.default.findOne({ where: { id: p } }));
    }
}
exports.default = User;
