import { Model, NonAttribute } from "sequelize";

type TaskSubmissionAttributes = {
  id: string;
  taskID: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

class TaskSubmission extends Model<
  TaskSubmissionAttributes,
  TaskSubmissionAttributes
> {
  declare id: string;
  declare taskId: string;
  declare text: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Text(): NonAttribute<string> {
    return this.text;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get TaskId(): NonAttribute<string> {
    return this.taskId;
  }
}
export default TaskSubmission;
