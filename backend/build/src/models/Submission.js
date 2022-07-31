"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Submission extends sequelize_1.Model {
    get Content() {
        return this.content;
    }
    get Name() {
        return this.name;
    }
    get CreatedAt() {
        return this.createdAt;
    }
    get UserID() {
        return this.userName;
    }
}
exports.default = Submission;
