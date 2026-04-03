import { JobModel } from "../models/jobs.js";

export class jobsController {

    static async getAllJobs(req, res) {
        const { offset = 0, limit = 10, text, technology, type, level } = req.query;
        const { paginatedJobs, total } = await JobModel.getAllJobs({ offset, limit, text, technology, type, level });
        return res.json({
            total: total,
            result: paginatedJobs.length,
            offset: Number(offset),
            limit: Number(limit),
            data: paginatedJobs
        });
    }

    static async getJobById(req, res) {
        const { id } = req.params;
        const job = await JobModel.getJobById(id);
        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        return res.json(job);
    }

    static async createJob(req, res) {
        const { titulo, empresa, descripcion, ubicacion, data } = req.body;

        const newJob = await JobModel.createJob({ titulo, empresa, descripcion, ubicacion, data });

        res.status(201).json(newJob);
    }

    static async updateJob(req, res) {

        const { id } = req.params;
        const { titulo, empresa, descripcion, ubicacion, data } = req.body;

        const jobId = await JobModel.updateJob({ id, titulo, empresa, descripcion, ubicacion, data });

        if (!jobId) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.status(200).json(jobId);
    }

    static async patchJob(req, res) {
        const { id } = req.params;
        const input = req.body;

        const updatedJob = await JobModel.patchJob({ id, input });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.status(200).json(updatedJob);
    }

}