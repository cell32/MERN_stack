import { Router } from "express";
import {
  getApplicationStatus,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

import upload from "../middleware/multerMiddleware.js";

const router = new Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStatus,
]);

router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"), // this was set up after creating multer middleware to handle upload img file in profile
  validateUpdateUserInput,
  updateUser
);

export default router;
