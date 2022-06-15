import { Model, Optional, NonAttribute } from "sequelize";

type TaskAttributes = {
  id: string;
  name: string;
  description: string;
  prerequisites: Array<string>;
  files: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};
type TaskCreationAttributes = Optional<TaskAttributes, "prerequisites">;

class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  declare id: string;
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
  get Id(): NonAttribute<string> {
    return this.id;
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
