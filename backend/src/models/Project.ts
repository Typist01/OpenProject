import { Model, Optional, NonAttribute } from "sequelize";
import Task from "./Task";

type ProjectAttributes = {
  name: string;
  description: string;
  contributors: Array<string>;
  tasks: { name: string };
  createdAt: Date;
  updatedAt: Date;
};
type ProjectCreationAttributes = Optional<ProjectAttributes, "tasks">;

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> {
  declare name: string;
  declare description: string;
  declare contributors: Array<string>;
  declare tasks: { name: string; project: string };
  declare createdAt: Date;
  declare updatedAt: Date;

  get Description(): NonAttribute<string> {
    return this.description;
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
  async getTasks() {
    return Object.values(this.tasks).map(t =>
      Task.findOne({ where: { name: t, projectName: this.Name } })
    );
  }
}
export default Project;
