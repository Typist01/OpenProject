"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TaskSubmission extends sequelize_1.Model {
    get Text() {
        return this.text;
    }
    get Id() {
        return this.id;
    }
    get TaskId() {
        return this.taskId;
    }
}
exports.default = TaskSubmission;
