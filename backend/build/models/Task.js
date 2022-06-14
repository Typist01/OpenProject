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
    get Id() {
        return this.id;
    }
    get Title() {
        return this.title;
    }
    get Contributors() {
        return this.contributors;
    }
}
exports.default = Task;
