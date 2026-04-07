import express from 'express';
import swaggerUi, { serve } from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan'

import db from './config/db'
import router from './routes';


//Conectar a db
export async function connectDB() {
    try {
        await db.authenticate()
        await db.sync() // para poder agregar nuevas columnas
        //console.log("Conexión exitosa a DB"); //--Se comenta para evitar warnings en las pruebas
    } catch (error) {
        console.log(error);
        console.log("error al conectarse a DB")
    }
}
connectDB();

// Instancia de express
const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONT_URL) {
            //console.log(origin)
            //console.log('Permitir');
            callback(null,true) // error,permitir:boolean
        }else if(!origin){
            callback(null,true)
        } else {
            callback(new Error('Error de CORS. No Permitido'))
        }
    }
}

server.use(cors(corsOptions));

// Leer datos json
server.use(express.json());

// Morgan para el Logging
server.use(morgan('dev'));

// Routing
server.use('/api/products', router);


// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));


export default server