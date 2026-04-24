import request from "supertest";
import server from "../server.js";
import Database from "../config/db.js";
import { QueryTypes } from "sequelize";

describe('POST /api/presentation', () => {
    // Limpieza: Evita que los correos se dupliquen entre pruebas
    beforeAll(async () => {
        await Database.db.query('DELETE FROM presentations WHERE name = ?', { replacements: ['presentation test 1'], type: QueryTypes.DELETE });
    });
    afterAll(async () => {
        await Database.db.query('DELETE FROM presentations WHERE email = ?', { replacements: ['presentation test 1'], type: QueryTypes.DELETE });
        await Database.db.close();
    });

    it('deberia registrar una presentación exitosamente con datos válidos', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({
                
            })
    })
})