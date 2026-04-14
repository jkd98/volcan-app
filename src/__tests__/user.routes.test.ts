import request from 'supertest';
import server from "../server.js"; // Tu instancia de Express
import Database from '../config/db.js'; // Para limpiar después de probar
import { QueryTypes } from 'sequelize';

describe('POST /api/users', () => {

    // Limpieza: Evita que los correos se dupliquen entre pruebas
    beforeAll(async () => {
        await Database.db.query('DELETE FROM users WHERE email = ?', { replacements: ['test@email.com'], type: QueryTypes.DELETE });
    });
    afterAll(async () => {
        await Database.db.query('DELETE FROM users WHERE email = ?', { replacements: ['test@email.com'], type: QueryTypes.DELETE });
        await Database.db.close();
    });

    it('debería registrar un usuario exitosamente con datos válidos', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({
                name: "Test User",
                email: "test@email.com",
                pass: "Password123!",
                role_uuid: "a93aa33b-3473-4d21-945c-587cb1037d23"
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('debería fallar (400) si el email no es válido', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({
                name: "Test",
                email: "correo-invalido",
                pass: "123"
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        // Aquí verificas que tu middleware handle_input_errors esté funcionando
        expect(response.body.errors).toBeDefined();
    });

    it('debería fallar por duplicidad de registros', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({
                name: "Test User",
                email: "test@email.com",
                pass: "Password123!",
                role_uuid: "a93aa33b-3473-4d21-945c-587cb1037d23"
            });
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);

    })
});