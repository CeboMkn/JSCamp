import {test, describe, before, after} from 'node:test';
import asset from 'assert';
import app from './app.js'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

/* Probar servidor antes de cada prueba */
before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve());
        server.on('error', (err) => reject(err));
    });
});

/* Despues de ejecutar todas la pruebas */
after(async () => {
    return new Promise((resolve, reject) => {
        server.close ((err) => {
            if (err) reject(err);
            resolve();
        })
    })
})

describe('GET /jobs', () => {
    test('Debe responder con 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        asset.strictEqual(response.status, 200);
        
        const json = await response.json();
        asset.ok(Array.isArray(json.data), 'La respuesta debe ser un array');
    })
})