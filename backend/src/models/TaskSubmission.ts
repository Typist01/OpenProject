import { Model, NonAttribute } from "sequelize";

type TaskSubmissionAttributes = {
  id: string;
  taskName: string;
  userName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

class TaskSubmission extends Model<
  TaskSubmissionAttributes,
  TaskSubmissionAttributes
> {
  declare id: string;
  declare taskName: string;
  declare userName: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Content(): NonAttribute<string> {
    return this.content;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get TaskName(): NonAttribute<string> {
    return this.taskName;
  }
  get UserName(): NonAttribute<string> {
    return this.userName;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
}
export default TaskSubmission;
