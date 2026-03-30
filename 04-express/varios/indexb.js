import express from 'express';
import cors from 'cors';
import datajobs from '../jobs.json' with {type: 'json'}

let jobs = [...datajobs];

const PORT = process.env.PORT || 3000;
const app = express();

const ACEPTED_ORIGINS = [
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (ACEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origen no permitido por CORS'));
    }
}));

/* Mostrar tiempo de solicitud */
app.use((req, res, next) => {
    const timeString = new Date().toLocaleTimeString();
    console.log(`[${timeString}] ${req.method} ${req.url}`);
    next();
})

app.use(express.json());

/* Mostrar donde esta corriendo el servidor */
app.listen(PORT, () => {
    console.log(`Servidor correndo en http://localhost:${PORT}`);
})

/* Ruta principal */
app.get('/', (req, res) => {
    res.send('Servidor en marcha');
});

/* GET ***************************************************************************************************/

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

    return res.json({ data: paginatedJobs });
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

/* POST ***************************************************************************************************/

app.post('/jobs', (req, res) => {

    const { titulo, empresa, descripcion, ubicacion, data } = req.body;

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        descripcion,
        ubicacion,
        data
    }

    jobs.push(newJob);

    res.status(201).json(newJob);
})

/* PUT *****************************************************************************************************/

app.put('/jobs/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, empresa, descripcion, ubicacion, data } = req.body;

    const jobId = jobs.find(job => job.id === id);

    if (!jobId) {
        return res.status(404).json({ error: 'Trabajo no encontrado' });
    }

    jobId.titulo = titulo || jobId.titulo;
    jobId.empresa = empresa || jobId.empresa;
    jobId.descripcion = descripcion || jobId.descripcion;
    jobId.ubicacion = ubicacion || jobId.ubicacion;
    jobId.data = data || jobId.data;

    return res.status(200).json(jobId);

})

/* PATCH ***************************************************************************************************/

app.patch('/jobs/:id', (req, res) => {
    const { id } = req.params;

    const jobIndex = jobs.findIndex(job => job.id === id);

    if (jobIndex === -1) {
        return res.status(404).json({ error: 'Trabajo no encontrado' });
    }

    const updatedJob = {
        ...jobs[jobIndex],
        ...req.body
    };

    updatedJob.id = jobs[jobIndex].id;

    jobs[jobIndex] = updatedJob;

    return res.status(200).json(updatedJob);
});