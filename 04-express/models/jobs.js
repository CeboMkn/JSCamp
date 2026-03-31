import fs from 'fs';

const jobs = JSON.parse(
    fs.readFileSync(new URL('../data/jobs.json', import.meta.url))
);

export class JobModel {
    static async getAllJobs({ offset = 0, limit = 10, text }) {
        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);
        let filteredJobs = jobs

        if (text) {
            const lowerText = text.toLowerCase();
            filteredJobs = filteredJobs.filter(
                job => job.titulo.toLowerCase().includes(lowerText) || job.descripcion.toLowerCase().includes(lowerText));
        }

        const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);
        return paginatedJobs;
    }

    static async getJobById(id) {
        const job = jobs.find(job => job.id === id);

        return job;
    }

    static async createJob({ titulo, empresa, descripcion, ubicacion, data }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            descripcion,
            ubicacion,
            data
        }

        jobs.push(newJob);
        return newJob;
    }

    static async updateJob({ id, titulo, empresa, descripcion, ubicacion, data }) {
        const jobId = jobs.find(job => job.id === id);

        if (!jobId) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        jobId.titulo = titulo || jobId.titulo;
        jobId.empresa = empresa || jobId.empresa;
        jobId.descripcion = descripcion || jobId.descripcion;
        jobId.ubicacion = ubicacion || jobId.ubicacion;
        jobId.data = data || jobId.data;
        return jobId;
    }

    static async patchJob({id, input}) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        const updatedJob = {
            ...jobs[jobIndex],
            ...input
        };

        updatedJob.id = jobs[jobIndex].id;

        jobs[jobIndex] = updatedJob;
        return updatedJob;
    }
}