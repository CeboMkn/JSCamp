import { jobs } from "../data/jobs.js";

export class jobsController {
    static async getAllJobs(req, res) {
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
    }

    static async getJobById(req, res) {
        const { id } = req.params;
        const job = jobs.find(job => job.id === id);

        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.json(job);
    }

    static async createJob(req, res) {
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
    }

    static async updateJob(req, res) {

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
    }

    static async patchJob(req, res) {
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
    }

}