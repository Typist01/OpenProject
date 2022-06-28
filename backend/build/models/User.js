"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
let User = class User extends sequelize_typescript_1.Model /* <{
  name: string;
  projects: { [id in number]: string } | null;
  communities: { [id in number]: string } | null;
  image: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}> */ {
    name;
    projects;
    communities;
    image;
    password;
};
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    sequelize_typescript_1.NotNull
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON()),
    sequelize_typescript_1.AllowNull
], User.prototype, "projects", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON()),
    sequelize_typescript_1.AllowNull
], User.prototype, "communities", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.TEXT()),
    sequelize_typescript_1.AllowNull
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(72)),
    sequelize_typescript_1.NotNull
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.CreatedAt
], User.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.Column,
    sequelize_typescript_1.UpdatedAt
], User.prototype, "updatedAt", void 0);
User = __decorate([
    sequelize_typescript_1.Table
], User);
exports.default = User;
