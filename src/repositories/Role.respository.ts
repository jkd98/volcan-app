import { Op } from "sequelize";
import { IRoleRepository } from "../interfaces/IRoleRepository.js";
import { Role } from "../models/index.js";
import { RoleAttributes } from "../models/Role.model.js";

export class RoleRepository implements IRoleRepository {
    async findByUUID(role_uuid: RoleAttributes["uuid"]): Promise<Role | null> {
        const role = await Role.findOne({
            where: {
                uuid: {
                    [Op.eq]: role_uuid
                }
            }
        });

        return role;
    }

}

const roleRepository = new RoleRepository();
export default roleRepository;