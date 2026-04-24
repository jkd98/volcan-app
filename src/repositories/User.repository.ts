import { Op, Transaction } from "sequelize";
import { User } from "../models/index.js";
import { UserAttributes, UserCreationAttributes } from "../models/Users.model.js";
import { IUserRespository } from "../interfaces/IUserRepository.js";

export class UserRepository implements IUserRespository {

    async findOneByEmail(email: UserAttributes['email']): Promise<User | null> {
        const userExistst = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });

        return userExistst
    }

    async create(data: UserCreationAttributes, t:Transaction): Promise<User> {
        const nwUser = await User.create(data);
        return nwUser;
    }
}

const userRespository = new UserRepository();

export default userRespository;