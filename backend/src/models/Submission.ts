import { Model, NonAttribute } from "sequelize";

type SubmissionAttributes = {
  name: string;
  userName: string;
  projectName: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

class Submission extends Model<SubmissionAttributes> {
  declare name: string;
  declare userName: string;
  declare projectName: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Content(): NonAttribute<string> {
    return this.content;
  }
  get Name(): NonAttribute<string> {
    return this.name;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
  get UserID(): string {
    return this.userName;
  }
}

export default Submission;
