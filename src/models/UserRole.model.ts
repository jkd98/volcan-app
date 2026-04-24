import { CreationOptional, DataTypes, ForeignKey, Model, Optional } from "sequelize";
import Database from "../config/db.js";
import { UserAttributes } from "./Users.model.js";
import { RoleAttributes } from "./Role.model.js";

export type UserRoleAttributes = {
    id: number;
    uuid: string;
    user_id: UserAttributes['user_id'];
    role_id: RoleAttributes['role_id'];
}

export type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id' | 'uuid'>;

export class UserRole extends Model<UserRoleAttributes, UserRoleCreationAttributes> {
    declare id: CreationOptional<number>;
    declare uuid: CreationOptional<string>;
    declare user_id: ForeignKey<UserAttributes['user_id']>
    declare role_id: ForeignKey<RoleAttributes['role_id']>
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

UserRole.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'user_id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE' // Si borras al usuario, se borra su relación de rol
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'roles', key: 'role_id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE' // Si borras al usuario, se borra su relación de rol
        }
    },
    {
        tableName: 'user_role',
        sequelize: Database.db
    }
)