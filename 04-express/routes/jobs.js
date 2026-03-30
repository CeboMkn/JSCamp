import { Router } from "express";
import { jobsController } from "../controllers/jobs.js";

export const jobsRouter = Router();

/* GET ***************************************************************************************************/

jobsRouter.get('/', jobsController.getAllJobs);
jobsRouter.get('/:id', jobsController.getJobById);

/* POST **************************************************************************************************/

jobsRouter.post('/', jobsController.createJob);

/* PUT ***************************************************************************************************/

jobsRouter.put('/:id', jobsController.updateJob);

/* PATCH *************************************************************************************************/

jobsRouter.patch('/:id', jobsController.patchJob);