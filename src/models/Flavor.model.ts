import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import Database from "../config/db.js";

type FlavorAttributes = {
    flavor_id: number;
    uuid:string;
    user_id:number;
    name: string;
    image:string|null;
    category: 'Especialidad' | 'Sencillo';
};

type FlavorCreationAttributes = Optional<FlavorAttributes,'flavor_id'>;


export class Flavor extends Model< FlavorAttributes, FlavorCreationAttributes > {
    declare flavor_id: CreationOptional<number>;
    declare uuid:string;
    declare user_id:number;
    declare name: string;
    declare image:string|null;
    declare category: 'Especialidad' | 'Sencillo';
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

const categories = ['Especialidad', 'Sencillo'];

Flavor.init(
    {
        flavor_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // UUID para la API y URLs
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Se genera solo al crear
            unique: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Se conectará con la tabla Users
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type:DataTypes.STRING,
            allowNull:true
        },
        category: {
            type: DataTypes.ENUM(...categories),
            allowNull: false
        }
    },
    {
        tableName: 'flavors',
        sequelize: Database.db
    }
)