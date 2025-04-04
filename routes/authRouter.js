import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import {
  validaLoginInput,
  validaRegisterInput,
} from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 100,
  max: 3,
  message: { msg: "IP rate limit exceeded, rety in 15 minutes" },
});

const router = new Router();

router.post("/register", apiLimiter, validaRegisterInput, register);
router.post("/login", apiLimiter, validaLoginInput, login);
router.get("/logout", logout);

export default router;
