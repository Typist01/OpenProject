import { Model, InferAttributes, InferCreationAttributes, NonAttribute } from "sequelize";

class User extends Model<InferAttributes<User, { omit: 'projects' }>, InferCreationAttributes<User, { omit: 'projects' }>> {
    declare userid: number;
    declare username: string;
    declare preferredName: string | null;
    declare createdAt: Date;
    declare updatedAt: Date;

    declare projects?: NonAttribute<Project[]>;
    
    get getUsername(): NonAttribute<string> {
        return this.username;
    }
    get getUserid(): NonAttribute<number> {
        return this.userid;
    }
}
export default User;