"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Task extends sequelize_1.Model {
    get Prerequisites() {
        return this.prerequisites;
    }
    get Description() {
        return this.description;
    }
    get ProjectName() {
        return this.projectName;
    }
    get Name() {
        return this.name;
    }
    get Contributors() {
        return this.contributors;
    }
    get CreatedAt() {
        return this.createdAt;
    }
}
exports.default = Task;
