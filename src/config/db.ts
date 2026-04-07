import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv';
//import { Product } from '../models/Product.model';


dotenv.config()

const db = new Sequelize({
    dialect: 'postgres',
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    //models: [Product],
    logging:false //--para evitar warnings en las pruebas por console logs
})


export default db;