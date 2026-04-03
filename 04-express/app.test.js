import { test, describe, before, after } from 'node:test';
import assert from 'assert';
import app from './app.js';

/* LANZAR TESTS */
/* $env:NODE_ENV="test"; node --test app.test.js  */

/* TEST MIENTRAS HACES CAMBIOS */
/* $env:NODE_ENV="test"; node --watch --test app.test.js  */

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

// Lanzar el servidor antes de ejecutar cualquier test
before(async () => {
    server = await new Promise((resolve, reject) => {
        const s = app.listen(PORT, () => resolve(s));
        s.on('error', (err) => reject(err));
    });
});

// Cerrar el servidor después de todos los tests
after(async () => {
    if (server) {
        await new Promise((resolve, reject) => {
            server.close((err) => (err ? reject(err) : resolve()));
        });
    }
});

describe('GET /jobs', () => {
    test('Debe responder con 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`);
        assert.strictEqual(response.status, 200);

        const json = await response.json();
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array');
    });

    test('Debe filtrar trabajos por texto, tecnología, tipo y nivel', async () => {
        const text = 'Desarrollador';
        const technology = 'JavaScript';
        const type = 'Remoto';
        const level = 'Senior';

        const response = await fetch(
            `${BASE_URL}/jobs?text=${text}&technology=${technology}&type=${type}&level=${level}`
        );

        assert.strictEqual(response.status, 200);

        const json = await response.json();

        // Verificar estructura
        assert.strictEqual(typeof json.total, 'number', 'Debe devolver un total como número');
        assert.strictEqual(typeof json.result, 'number', 'Debe devolver result como número');
        assert.strictEqual(typeof json.offset, 'number', 'Debe devolver offset como número');
        assert.strictEqual(typeof json.limit, 'number', 'Debe devolver limit como número');
        assert.ok(Array.isArray(json.data), 'Debe devolver un array en data');

        // Debe haber al menos un resultado
        assert.ok(json.data.length > 0, 'Debe devolver al menos un resultado');

        // Verificar cada trabajo contra los filtros
        json.data.forEach((job) => {
            // Texto
            assert.ok(
                job.titulo.toLowerCase().includes(text.toLowerCase()) ||
                job.descripcion.toLowerCase().includes(text.toLowerCase()),
                `El trabajo "${job.titulo}" no contiene el texto "${text}"`
            );

            // Tecnología
            assert.ok(
                job.data.technology.some((tech) =>
                    tech.toLowerCase().includes(technology.toLowerCase())
                ),
                `El trabajo "${job.titulo}" no contiene la tecnología "${technology}"`
            );

            // Tipo
            assert.ok(
                job.data.modalidad.toLowerCase().includes(type.toLowerCase()),
                `El trabajo "${job.titulo}" no es del tipo "${type}"`
            );

            // Nivel
            assert.ok(
                job.data.nivel.toLowerCase().includes(level.toLowerCase()),
                `El trabajo "${job.titulo}" no es del nivel "${level}"`
            );
        });
    });
});

describe('GET /jobs/:id', () => {
    test('Debe responder con 200 y devolver un trabajo por id', async () => {
        const jobId = '7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4';

        const response = await fetch(`${BASE_URL}/jobs/${jobId}`);
        assert.strictEqual(response.status, 200);

        const json = await response.json();

        // Verificar que es un objeto
        assert.strictEqual(typeof json, 'object', 'Debe devolver un objeto');

        // Verificar campos principales
        assert.strictEqual(json.id, jobId, 'El id debe coincidir');
        assert.strictEqual(typeof json.titulo, 'string');
        assert.strictEqual(typeof json.empresa, 'string');
        assert.strictEqual(typeof json.descripcion, 'string');

        // Verificar data
        assert.ok(json.data, 'Debe tener data');
        assert.ok(Array.isArray(json.data.technology), 'technology debe ser un array');
        assert.strictEqual(typeof json.data.modalidad, 'string');
        assert.strictEqual(typeof json.data.nivel, 'string');

        // Verificar content
        assert.ok(json.content, 'Debe tener content');
        assert.strictEqual(typeof json.content.description, 'string');
        assert.strictEqual(typeof json.content.responsibilities, 'string');
        assert.strictEqual(typeof json.content.requirements, 'string');
        assert.strictEqual(typeof json.content.about, 'string');
    });

    test('Debe responder con 404 si el id no existe', async () => {
        const fakeId = 'no-existe-id';

        const response = await fetch(`${BASE_URL}/jobs/${fakeId}`);
        assert.strictEqual(response.status, 404);
    });
});