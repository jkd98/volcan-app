import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import Database from "../config/db.js";

type FlavorAttributes = {
    flavor_id: number;
    name: string;
    image:string|null;
    category: 'Especialidad' | 'Sencillo';
};

type FlavorCreationAttributes = Optional<FlavorAttributes,'flavor_id'>;


export class Flavor extends Model< FlavorAttributes, FlavorCreationAttributes > {
    declare flavor_id: CreationOptional<number>;
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