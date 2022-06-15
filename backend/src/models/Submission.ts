import { Model, Optional, NonAttribute } from "sequelize";

type SubmissionAttributes = {
  id: string;
  userID: string;
  content: string;
  images: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};

type SubmissionCreationAttributes = Optional<SubmissionAttributes, "images">;
class Submission extends Model<
  SubmissionAttributes,
  SubmissionCreationAttributes
> {
  declare id: string;
  declare userID: string;
  declare content: string;
  declare images: Array<string>;
  declare createdAt: Date;
  declare updatedAt: Date;

  get Content(): NonAttribute<string> {
    return this.content;
  }
  get Id(): NonAttribute<string> {
    return this.id;
  }
  get Images(): Array<string> {
    return this.images;
  }
  get CreatedAt(): NonAttribute<Date> {
    return this.createdAt;
  }
  get UserID(): string {
    return this.userID;
  }
}

export default Submission;
