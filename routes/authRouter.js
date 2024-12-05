import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validaLoginInput,
  validaRegisterInput,
} from "../middleware/validationMiddleware.js";

const router = new Router();

router.post("/register", validaRegisterInput, register);
router.post("/login", validaLoginInput, login);
router.get("/logout", logout);

export default router;
