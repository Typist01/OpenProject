import { Model, Optional, NonAttribute } from "sequelize";
import Project from "./Project";
import Community from "./Community";

type UserAttributes = {
  name: string;
  projects: { name: string };
  communities: { name: string };
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
type UserCreationAttributes = Optional<UserAttributes, "projects"> &
  Optional<UserAttributes, "communities"> &
  Optional<UserAttributes, "image">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare name: string;
  declare projects: { name: string };
  declare communities: { name: string };
  declare image: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Name(): NonAttribute<string> {
    return this.name;
  }
  get Image(): NonAttribute<string> {
    return this.image;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
  async getProjects() {
    return Object.values(this.projects).map(p =>
      Project.findOne({ where: { name: p } })
    );
  }
  async getCommunities() {
    return Object.values(this.communities).map(p =>
      Community.findOne({ where: { name: p } })
    );
  }
}
export default User;
