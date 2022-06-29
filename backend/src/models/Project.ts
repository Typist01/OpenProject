import {
  Table,
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  DataType,
  AllowNull,
} from "sequelize-typescript";

@Table
class Project extends Model<Project> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  description!: string;

  @AllowNull(false)
  @Column(DataType.JSON())
  contributors!: Array<string>;

  @AllowNull
  @Column(DataType.JSON())
  tasks?: { name: string; project: string };

  @CreatedAt
  @Column(DataType.DATE)
  declare createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  declare updatedAt: Date;
}
export default Project;
