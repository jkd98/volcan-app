import { CreationOptional, DataTypes, Model, Optional } from "sequelize";
import Database from "../config/db.js";

export type RoleAttributes = {
    role_id: number;
    uuid: string;
    name: string;
};

export type RoleCreationAttributes = Optional<RoleAttributes, 'role_id' | 'uuid'>;

export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
    declare role_id: CreationOptional<number>;
    declare uuid: CreationOptional<string>;
    declare name: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

Role.init(
    {
        role_id: {
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
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: 'roles',
        sequelize: Database.db
    }
)