import { DataTypes, Model, Optional, CreationOptional } from "sequelize";
import Database from "../config/db.js";

const categories = ['Especialidad', 'Sencillo'];


// 1. Atributos base
export type PresentationAttributes = {
    presentation_id: number;
    uuid:string;
    user_id: number; // <--- El dueño del registro
    name: string;
    descrip: string | null;
    image: string | null;
    price: number;
    category: 'Especialidad' | 'Sencillo'; // Mejor usar los valores reales aquí 464740
};

// 2. Atributos para creación (lo que es opcional al hacer .create())
export type PresentationCreationAttributes = Optional<PresentationAttributes, 'presentation_id' | 'uuid' >;

export class Presentation extends Model<PresentationAttributes, PresentationCreationAttributes> {
    // IMPORTANTE: Declarar las propiedades para poder usarlas en tu código
    //  CreationOptional para campos autogenerados
    declare presentation_id: CreationOptional<number>;
    declare uuid: CreationOptional<string>;
    declare user_id: number;
    declare name: string;
    declare descrip: string | null;
    declare price: number;
    declare image: string | null;
    declare category: 'Especialidad' | 'Sencillo';
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}


Presentation.init(
    {
        presentation_id: {
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
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE' //Si borro al usuario se borran sus presentaciones
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descrip: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category: {
            type: DataTypes.ENUM(...categories),
            allowNull: false
        }
    },
    {
        tableName: 'presentations',
        sequelize: Database.db
    }
);