import bcrypt from "bcrypt";
import { Transaction } from "sequelize";
import Database from "../config/db.js"

import { UserRegsitration } from "../models/Users.model.js";
import { DuplicateError, NotFoundError } from "../errors/SpecificErrors.js";

import { IUserRespository } from "../interfaces/IUserRepository.js";
import { IRoleRepository } from "../interfaces/IRoleRepository.js";
import { IUserRoleRepository } from "../interfaces/IUserRoleRepository.js";

import userRespository from "../repositories/User.repository.js";
import roleRepository from "../repositories/Role.respository.js";
import userRoleRepository from "../repositories/UserRole.repository.js"


export class UserService {

    private userRespository: IUserRespository;
    private roleRepository: IRoleRepository;
    private userRoleRepository: IUserRoleRepository

    constructor(userRespository: IUserRespository, roleRepository: IRoleRepository, userRoleRepository: IUserRoleRepository) {
        this.userRespository = userRespository;
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }

    /**
     * Funcion utilizada para el registro de un usuario y su rol
     * @param data Es un objeto de tipo UserRegistration
     * @returns user
     */
    async createUser(data: UserRegsitration) {
        const t: Transaction = await Database.db.transaction() // Se inicia la transacción
        const { email, pass, image, role_uuid } = data;

        try {
            const userExistst = await this.userRespository.findOneByEmail(email);

            if (userExistst) {
                throw new DuplicateError("El correo ya esta registrado en esta app.");
            }

            const saltRounds = 12;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(pass, salt);
            const defaultImage = 'default/user-avatar.png';
            const userImage = image ? image : defaultImage;

            const roleExists = await this.roleRepository.findByUUID(role_uuid);

            if (!roleExists) {
                throw new NotFoundError("El rol no existe");
            }

            const nwUser = await this.userRespository.create({ ...data, pass: hashedPass, image: userImage }, t);
            await this.userRoleRepository.create({ role_id: roleExists.role_id, user_id: nwUser.user_id }, t);
            await t.commit()
            return await nwUser.reload();

        } catch (error) {
            await t.rollback();
            throw error;
        }

    }
}

const userService = new UserService(userRespository, roleRepository, userRoleRepository);

export default userService;