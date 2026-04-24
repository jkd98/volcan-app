import { Transaction } from "sequelize";
import { IUserRoleRepository } from "../interfaces/IUserRoleRepository.js";
import { UserRole, UserRoleCreationAttributes } from "../models/UserRole.model.js";

export class UserRoleRepository implements IUserRoleRepository {
    async create(data: UserRoleCreationAttributes, t:Transaction): Promise<UserRole> {
        const nwUserRole = await UserRole.create(data);
        return nwUserRole;
    }
}


const userRole = new UserRoleRepository();

export default userRole;