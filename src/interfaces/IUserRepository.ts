import { Transaction } from "sequelize";
import { User, UserAttributes, UserCreationAttributes } from "../models/Users.model.js";

export interface IUserRespository {
    findOneByEmail(email: UserAttributes['email']): Promise<User | null>;
    create(data:UserCreationAttributes,t:Transaction): Promise<User>;
}