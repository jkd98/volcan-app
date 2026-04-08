import { Sequelize } from 'sequelize';
import pg from 'pg';

class Database {
    public db: Sequelize;

    constructor() {
        const { DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

        if (!DATABASE || !DB_USER || !DB_PASSWORD || !DB_HOST) {
            throw new Error("Faltan variables de entorno para la conexión a la base de datos.");
        }

        this.db = new Sequelize(
            DATABASE,
            DB_USER,
            DB_PASSWORD,
            {
                dialect: 'postgres',
                dialectModule: pg,
                timezone: '+00:00', // UTC
                define: {
                    timestamps: true,
                    underscored: true, // Convierte camelCase a snake_case en Postgres (Recomendado)
                },
                dialectOptions: {
                    useUT: true,
                    /*
                    ssl: { //Esto se agrego para la db remota
                        require: true,
                        rejectUnauthorized: false
                    }
                    */
                },
                host: process.env.DB_HOST,
                port: Number(DB_PORT) || 5432,
                logging: false, //--para evitar warnings en las pruebas por console logs
                pool: {
                    max: 10,           // según tu BD
                    min: 2,           // conexiones mínimas siempre listas
                    acquire: 30000,   // 30s timeout, para obtener una conexión del pool
                    idle: 10000       // cierra conexiones inactivas después de 10s
                }
            }
        );
    }

    async connect() {
        try {
            await this.db.authenticate();
            // Aquí es donde importarías tus modelos para que sync los vea
            // import '../models/Presentation.model';

            await this.db.sync({ alter: true });
            console.log("Conexión exitosa a DB y tablas sincronizadas");
        } catch (error) {
            console.error("Error al conectarse a DB:", error);
            process.exit(1);
        }
    }
}

export default new Database();