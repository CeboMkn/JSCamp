import { createServer } from 'node:http';
import { uptime } from 'node:process';
import { randomUUID } from 'node:crypto';
import { json } from 'node:stream/consumers';

process.loadEnvFile()

/* Puerto donde escucha nuestra aplicacion, que está en .env como variable de entorno */
const port = process.env.PORT ?? 3000;

/* Función para enviar respuestas JSON */
function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}

/* Usuarios */
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

/* Creamos el servidor */
const server = createServer(async (req, res) => {

    /* Capturamos la url y el método */
    const { url, method } = req;
    /* path=path query=parámetros separamos los parámetros del path*/
    const [path, query] = url.split('?');
    /* Creamos una constante con los params */
    const searchParams = new URLSearchParams(query);

    /* Si el método es GET */
    if (method === 'GET') {
        if (path === '/') {

            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end('¡Hola, mundo!');
            return;
        }

        if (path === '/health') {
            sendJson(res, 200, {
                status: 'ok',
                uptime: Math.floor(uptime()),
                timestamp: Date.now()
            });
            return;
        }

        if (path === '/users') {

            /* Desde que usuario empieza */
            const offset = Number(searchParams.get('offset')) || 0;
            /* Cuantos me devuelv */
            const limit = Number(searchParams.get('limit')) || users.length;
            /* Creamos la páginacion con offset y limit (offset = 0 'muestrame desde el primero' offset + limit = 5 'hastal el resultado 5') */
            const paginatedUsers = users.slice(offset, offset + limit);

            /* Responde con un 200 y los usuarios filtrados */
            sendJson(res, 200, paginatedUsers);
            return;
        }
    }

    /* Si el método es POST */
    if (method === 'POST') {
        if (path === '/users') {

            /* Método para recuperar el body del request */
            const body = await json(req);
            if (!body || !body.name) {
                return sendJson(res, 400, { error: 'Name es requerido' });
            }

            /* Creamos un objeto con el nuevo usuario */
            const newUser = {
                id: randomUUID(),
                name: body.name
            };

            /* Lo pusheamos al array de usuarios */
            users.push(newUser);

            sendJson(res, 201, { message: `Usuario ${newUser.name} creado con éxito` });
            return;
        }

    }



    return sendJson(res, 404, { error: 'Not Found' });

})

server.listen(port, () => {
    const address = server.address();
    console.log(`Servidor escuchando en el puerto http://localhost:${address.port}`);
});


