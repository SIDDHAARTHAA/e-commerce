import { Router } from "express";
import { login, me, signup } from "../controllers/auth.js";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";

const authRoutes: Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));
authRoutes.get('/me', authMiddleware, errorHandler(me))


export default authRoutes;