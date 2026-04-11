import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User, UserCreationAttributes } from "../models/Users.model.js";
import { DuplicateError } from "../errors/SpecificErrors.js";

export class UserService {
    static async createUser(data: UserCreationAttributes) {
        const { email, pass, image } = data;
        const userExistst = await User.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });

        if (userExistst) {
            throw new DuplicateError("El correo ya esta registrado en esta app.");
        }

        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(pass, salt);

        let nwUser = new User(data);
        nwUser.pass = hashedPass;

        const defaultImage = 'default/user-avatar.png';
        nwUser.image = image ? image : defaultImage;

        return nwUser;

    }
}