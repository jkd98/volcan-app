import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User, UserRegsitration } from "../models/Users.model.js";
import { DuplicateError, NotFoundError } from "../errors/SpecificErrors.js";
import { Role } from "../models/Role.model.js";
import { UserRole } from "../models/UserRole.model.js";

export class UserService {
    static async createUser(data: UserRegsitration) {
        const { email, pass, image, role_uuid } = data;
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

        await nwUser.save();

        const roleExists = await Role.findOne({
            where: {
                uuid: {
                    [Op.eq]: role_uuid
                }
            }
        });

        if(!roleExists){
            throw new NotFoundError("El rol no existe");
        }

        await UserRole.create({ role_id: roleExists.role_id, user_id: nwUser.user_id });

        return await nwUser.reload();

    }
}