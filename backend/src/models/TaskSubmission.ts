import { Model, NonAttribute } from "sequelize";

type TaskSubmissionAttributes = {
  id: string;
  taskID: string;
  userID: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

class TaskSubmission extends Model<
  TaskSubmissionAttributes,
  TaskSubmissionAttributes
> {
  declare id: string;
  declare taskId: string;
  declare userID: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Content(): NonAttribute<string> {
    return this.content;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get TaskId(): NonAttribute<string> {
    return this.taskId;
  }
  get UserID(): NonAttribute<string> {
    return this.userID;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
}
export default TaskSubmission;
