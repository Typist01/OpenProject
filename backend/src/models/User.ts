import { Model, Optional, NonAttribute } from "sequelize";
import Project from "./Project";

type UserAttributes = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  projects: Array<string>;
};
type UserCreationAttributes = Optional<UserAttributes, "projects">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare token: string;
  declare projects: Array<string>;

  get Name(): NonAttribute<string> {
    return this.name;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  async getProjects() {
    return this.projects.map(p => Project.findOne({ where: { id: p } }));
  }
}
export default User;
