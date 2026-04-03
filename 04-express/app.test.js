import { test, describe, before, after } from 'node:test';
import assert from 'assert';
import app from './app.js'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

/* LANZAR EL TEST */
/* $env:NODE_ENV="test"; node --test app.test.js */

/* COMPROBAR TEST EN TIEMPO REAL */
/* $env:NODE_ENV="test"; node --watch --test app.test.js */

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
        server.close((err) => {
            if (err) reject(err);
            resolve();
        })
    })
})

describe('GET /jobs', () => {
    test('Debe responder con 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        assert.strictEqual(response.status, 200);

        const json = await response.json();
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array');
    })

    test('Debe filtrar trabajos por texto', async () => {
        const text = 'Desarrollador'
        const response = await fetch(`${BASE_URL}/jobs?text=${text}`)

        assert.strictEqual(response.status, 200);

        const json = await response.json()

        assert.ok(
            json.data.length > 0,
            'Debe devolver al menos un resultado'
        )

        json.data.forEach(job => {
            assert.ok(
                job.titulo.toLowerCase().includes(text.toLowerCase()) || job.descripcion.toLowerCase().includes(text.toLowerCase()),
                `El trabajo "${job.titulo}" no contiene el texto "${text}"`
            )
        })
    })
})

