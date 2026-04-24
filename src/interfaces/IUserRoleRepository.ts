import { Transaction } from "sequelize";
import { UserRole, UserRoleCreationAttributes } from "../models/UserRole.model.js";

export interface IUserRoleRepository {
    create(data:UserRoleCreationAttributes, t:Transaction): Promise<UserRole>;
}