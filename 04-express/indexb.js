import express from 'express';
import jobs from './jobs.json' with {type: 'json'}

const PORT = process.env.PORT || 3000;
const app = express();

/* Mostrar tiempo de solicitud */
app.use((req, res, next) => {
    const timeString = new Date().toLocaleTimeString();
    console.log(`[${timeString}] ${req.method} ${req.url}`);
    next();
})

/* Mostrar donde esta corriendo el servidor */
app.listen(PORT, () => {
    console.log(`Servidor correndo en http://localhost:${PORT}`);
})

/* Ruta principal */
app.get('/', (req, res) => {
    res.send('Servidor en marcha');
});

/* GET */

/* Enviar los trabajos */

app.get('/jobs', (req, res) => {
    const { offset = 0, limit = 10, text } = req.query;

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    let filteredJobs = jobs

    if (text) {
        const lowerText = text.toLowerCase();
        filteredJobs = filteredJobs.filter(
            job => job.titulo.toLowerCase().includes(lowerText) || job.descripcion.toLowerCase().includes(lowerText));
    }

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

    return res.json(paginatedJobs);
})

/* Enviar solo un trabajo por id */

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);

    if (!job) {
        return res.status(404).json({ error: 'Trabajo no encontrado' });
    }

    return res.json(job);

})

/* POST */

app.post('/jobs', (req, res) => {
    res.status(201).json({ message: 'Trabajo creado' });
})