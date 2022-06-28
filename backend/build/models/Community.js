"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
class Community extends sequelize_1.Model {
    get Description() {
        return this.description;
    }
    get Name() {
        return this.name;
    }
    get Projects() {
        return this.projects;
    }
    get CreatedAt() {
        return this.createdAt;
    }
    async getSubscribers() {
        return this.subscribers.map(s => User_1.default.findOne({ where: { name: s } }));
    }
}
exports.default = Community;
