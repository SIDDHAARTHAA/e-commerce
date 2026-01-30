import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from "../controllers/products.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";

const productsRoutes: Router = Router();

productsRoutes.post('/', authMiddleware, adminMiddleware, errorHandler(createProduct));
productsRoutes.put('/:id', authMiddleware, adminMiddleware, errorHandler(updateProduct));
productsRoutes.delete('/:id', authMiddleware, adminMiddleware, errorHandler(deleteProduct));
productsRoutes.get('/', errorHandler(listProducts));
productsRoutes.get('/:id', authMiddleware, errorHandler(getProductById));

export default productsRoutes;