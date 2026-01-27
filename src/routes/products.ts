import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import { createProduct } from "../controllers/products.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

const productsRoutes: Router = Router();

productsRoutes.post('/', authMiddleware, adminMiddleware, errorHandler(createProduct))

export default productsRoutes;