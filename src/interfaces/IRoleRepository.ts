import { Role, RoleAttributes } from "../models/Role.model.js";

export interface IRoleRepository {
    findByUUID(uuid:RoleAttributes['uuid']):Promise<Role|null>;
}