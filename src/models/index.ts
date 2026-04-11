import { User } from "./Users.model.js";
import { Presentation } from "./Presentation.model.js";
import { Flavor } from "./Flavor.model.js";
import { Role } from "./Role.model.js";
import { UserRole } from "./UserRole.model.js";

// 1. Un Usuario tiene muchos Roles a través de la tabla intermedia
User.belongsToMany(Role, {
    through: UserRole,      // Especificamos la tabla intermedia
    foreignKey: 'user_id',  // La llave en UserRole que apunta a User
    otherKey: 'role_id',    // La otra llave que apunta a Role
    as: 'roles'             // Alias para las consultas
});

// 2. Un Rol pertenece a muchos Usuarios
Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'role_id',
    otherKey: 'user_id',
    as: 'users'
});

export {
    User,
    Presentation,
    Flavor,
    Role,
    UserRole,
};