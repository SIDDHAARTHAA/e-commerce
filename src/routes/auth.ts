import { Router } from "express";
import { login, signup } from "../controllers/auth.js";
import { errorHandler } from "../error-handler.js";

const authRoutes: Router = Router();

authRoutes.post('/login', errorHandler(login));
authRoutes.post('/signup', errorHandler(signup));


export default authRoutes;