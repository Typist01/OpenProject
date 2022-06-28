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
class User extends Model<User> /* <{
  name: string;
  projects: { [id in number]: string } | null;
  communities: { [id in number]: string } | null;
  image: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}> */ {
  @Column(DataType.STRING(30))
  @NotNull
  name!: string;

  @Column(DataType.JSON())
  @AllowNull
  projects?: { [id in number]: string };

  @Column(DataType.JSON())
  @AllowNull
  communities?: { [id in number]: string };

  @Column(DataType.TEXT())
  @AllowNull
  image?: string;

  @Column(DataType.STRING(72))
  @NotNull
  password!: string;

  @Column
  @CreatedAt
  declare createdAt: Date;

  @Column
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
  // async getProjects() {
  //   return Object.values(this.projects).map(p =>
  //     Project.findOne({ where: { name: p } })
  //   );
  // }
  // async getCommunities() {
  //   return Object.values(this.communities).map(p =>
  //     Community.findOne({ where: { name: p } })
  //   );
}
export default User;
