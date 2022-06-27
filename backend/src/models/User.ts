import Project from "./Project";
import Community from "./Community";
import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  NotNull,
  AllowNull,
} from "sequelize-typescript";

@Table
class User extends Model {
  @Column(DataType.STRING(30))
  @NotNull
  declare name: string;

  @Column(DataType.JSON())
  @AllowNull
  declare projects: { [id in number]: string };

  @Column(DataType.JSON())
  @AllowNull
  declare communities: { [id in number]: string };

  @Column(DataType.TEXT())
  @AllowNull
  declare image: string;

  @Column(DataType.STRING(72))
  @NotNull
  declare password: string;

  @CreatedAt
  declare createdAt: Date;
  @UpdatedAt
  declare updatedAt: Date;

  // get Name(): NonAttribute<string> {
  //   return this.name;
  // }
  // get Image(): NonAttribute<string> {
  //   return this.image;
  // }
  // get CreatedAt(): NonAttribute<Date> {
  //   return this.createdAt;
  // }
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
