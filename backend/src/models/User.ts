import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AllowNull,
  PrimaryKey,
  NotNull,
} from "sequelize-typescript";

@Table
class User extends Model<User> {
  @PrimaryKey
  @NotNull
  @AllowNull(false)
  @Column(DataType.STRING(30))
  private declare name: string;

  @NotNull
  @AllowNull(false)
  @Column(DataType.STRING(72))
  private declare password: string;

  @NotNull
  @AllowNull(false)
  @Column(DataType.TEXT())
  private declare token: string;

  @AllowNull
  @Column(DataType.JSON())
  private declare projects?: { [id in number]: string };

  @AllowNull
  @Column(DataType.JSON())
  private declare communities?: { [id in number]: string };

  @AllowNull
  @Column(DataType.TEXT())
  private declare image?: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;

  public get Name(): string {
    return this.name;
  }

  public get Password(): string {
    return this.password;
  }

  public get Projects(): { [id in number]: string } | undefined {
    return this.projects;
  }

  public get Communities(): { [id in number]: string } | undefined {
    return this.communities;
  }

  public get Image(): string | undefined {
    return this.image;
  }

  public get Token(): string {
    return this.token;
  }
}
export default User;
