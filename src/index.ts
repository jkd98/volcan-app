import dotenv from 'dotenv';
dotenv.config(); // Debe ser lo primero

import server from "./server";
import Database from "./config/db";

const PORT = process.env.PORT || 3000;

async function startApp() {
    // 1. Conectar Base de Datos
    await Database.connect();

    // 2. Iniciar Servidor
    server.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto: ${PORT}`);
        console.log(`Documentación disponible en http://localhost:${PORT}/docs`);
    });
}

startApp();