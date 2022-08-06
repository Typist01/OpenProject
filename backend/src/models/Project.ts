import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AllowNull,
  AutoIncrement,
} from "sequelize-typescript";

@Table
class Project extends Model<Project> {
  @AllowNull(false)
  @Column(DataType.STRING(100))
  name!: string;

  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER({ unsigned: true }))
  declare id: string;

  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isPrivate!: boolean;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  description!: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  owner!: string;

  @AllowNull(false)
  @Column(DataType.JSON())
  contributors!: Array<string>;

  @AllowNull
  @Column(DataType.JSON())
  tasks?: { name: string; project: string };

  @AllowNull
  @Column(DataType.TEXT)
  image?: string;

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
export default Project;
