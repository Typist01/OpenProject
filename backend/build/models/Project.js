"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Task_1 = __importDefault(require("./Task"));
class Project extends sequelize_1.Model {
    get Description() {
        return this.description;
    }
    get Name() {
        return this.name;
    }
    get Id() {
        return this.id;
    }
    get Contributors() {
        return this.contributors;
    }
    async getTasks() {
        return this.tasks.map(t => Task_1.default.findOne({ where: { id: t } }));
    }
}
exports.default = Project;
