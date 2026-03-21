import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { jobsRouter } from './routes/jobs.js';

import { DEFAULTS } from './config.js';

const PORT = process.env.PORT || DEFAULTS.PORT;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor en marcha');
});

app.use('/jobs', jobsRouter);

/* Mostrar donde esta corriendo el servidor */
app.listen(PORT, () => {
    console.log(`Servidor correndo en http://localhost:${PORT}`);
})

