import { Model, Optional, NonAttribute } from "sequelize";
import Project from "./Project";
import Community from "./Community";

type UserAttributes = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  projects: Array<string>;
  communities: Array<string>;
  image: string;
  password: string;
};
type UserCreationAttributes = Optional<UserAttributes, "projects"> &
  Optional<UserAttributes, "communities"> &
  Optional<UserAttributes, "image">;

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare name: string;
  declare token: string;
  declare projects: Array<string>;
  declare communities: Array<string>;
  declare image: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Name(): NonAttribute<string> {
    return this.name;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get Image(): NonAttribute<string> {
    return this.image;
  }
  get Token(): NonAttribute<string> {
    return this.token;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
  async getProjects() {
    return this.projects.map(p => Project.findOne({ where: { id: p } }));
  }
  async getCommunities() {
    return this.communities.map(p => Community.findOne({ where: { id: p } }));
  }
}
export default User;
