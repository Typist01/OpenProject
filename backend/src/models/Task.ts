import { Model, Optional, NonAttribute } from "sequelize";

type TaskAttributes = {
  projectName: string;
  name: string;
  description: string;
  prerequisites: { content: string };
  files: { content: string };
  createdAt: Date;
  updatedAt: Date;
};
type TaskCreationAttributes = Optional<TaskAttributes, "prerequisites">;

class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  declare projectName: string;
  declare name: string;
  declare description: string;
  declare contributors: Array<string>;
  declare prerequisites: Array<string>;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Prerequisites(): NonAttribute<Array<string>> {
    return this.prerequisites;
  }
  get Description(): NonAttribute<string> {
    return this.description;
  }
  get ProjectName(): NonAttribute<string> {
    return this.projectName;
  }
  get Name(): NonAttribute<string> {
    return this.name;
  }
  get Contributors(): Array<string> {
    return this.contributors;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
}
export default Task;
