"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class TaskSubmission extends sequelize_1.Model {
    get Content() {
        return this.content;
    }
    get Id() {
        return this.id;
    }
    get TaskName() {
        return this.taskName;
    }
    get UserName() {
        return this.userName;
    }
    get CreatedAt() {
        return this.createdAt;
    }
}
exports.default = TaskSubmission;
