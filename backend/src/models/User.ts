import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AllowNull,
  PrimaryKey,
} from "sequelize-typescript";

@Table
class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name!: string;

  @AllowNull
  @Column(DataType.JSON())
  projects?: { [id in number]: string };

  @AllowNull
  @Column(DataType.JSON())
  communities?: { [id in number]: string };

  @AllowNull
  @Column(DataType.TEXT())
  image?: string;

  @AllowNull(false)
  @Column(DataType.STRING(72))
  password!: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
export default User;
