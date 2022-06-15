import { Model, Optional, NonAttribute } from "sequelize";
import Task from "./Task";

type ProjectAttributes = {
  id: string;
  name: string;
  description: string;
  contributors: Array<string>;
  tasks: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};
type ProjectCreationAttributes = Optional<ProjectAttributes, "tasks">;

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  declare id: string;
  declare name: string;
  declare description: string;
  declare contributors: Array<string>;
  declare tasks: Array<string>;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Description(): NonAttribute<string> {
    return this.description;
  }
  get Name(): NonAttribute<string> {
    return this.name;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get Contributors(): Array<string> {
    return this.contributors;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
  async getTasks() {
    return this.tasks.map(t => Task.findOne({ where: { id: t } }));
  }
}
export default Project;
