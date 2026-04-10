import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/swagger.js';
import rootRouter from './routes/index.js';

const server = express();

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin === process.env.FRONT_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS. No Permitido'));
        }
    }
};

server.use(cors(corsOptions));
server.use(express.json());
server.use(morgan('dev'));

server.use('/api', rootRouter);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;