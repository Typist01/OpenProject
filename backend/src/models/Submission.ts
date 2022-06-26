import { Model, NonAttribute } from "sequelize";
// whhat do we wanna do now?ok
// continue with this, we kinda dropped it to develop in the internet computer.
// I think we were on the part where we were trying to connect to mysql workbench ok
// I was trying to create tables there. mySQL is empty atm, making a new connection. start by creating the users table ok

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
