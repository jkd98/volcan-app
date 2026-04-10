import { CreationOptional, DataTypes, Model, Optional } from "sequelize";
import Database from "../config/db.js";

export type UserAttributes = {
    user_id: number;
    uuid: string;
    name: string;
    email: string;
    pass: string;
    image: string | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'user_id' | 'uuid'>;

// Esto permite que todos los campos sean opcionales, pero excluye los que NO deben tocarse
export type UserUpdateAttributes = Partial<Omit<UserAttributes, 'user_id' | 'uuid'>>;


export class User extends Model<UserAttributes, UserCreationAttributes> {
    declare user_id: CreationOptional<number>;
    declare uuid: CreationOptional<string>;
    declare name: string;
    declare email: string;
    declare pass: string;
    declare image: string | null;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
}

User.init(
    {
        user_id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        uuid: {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            unique:true,
            allowNull:false
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false
        },

        pass: {
            type:DataTypes.STRING,
            allowNull:false
        },
        image: {
            type:DataTypes.STRING,
            allowNull:true
        }
    },
    {
        tableName:'users',
        sequelize:Database.db
    }
)