import { Router } from "express";
import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} from "../controllers/jobController.js";
import { validateJobInput } from "../middleware/validationMiddleware.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";

import { checkForTestUser } from "../middleware/authMiddleware.js";

const router = Router();
// router.get("/", getAllJobs);
// router.post("/", createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
