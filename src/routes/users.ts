import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { addAddress, deleteAddress, health, listAddress, updateUser } from "../controllers/users.js";

const usersRoutes: Router = Router();

usersRoutes.get('/health', errorHandler(health));
usersRoutes.post('/address', authMiddleware, adminMiddleware, errorHandler(addAddress));
usersRoutes.delete('/address/:id', authMiddleware, adminMiddleware, errorHandler(deleteAddress));
usersRoutes.get('/address', authMiddleware, adminMiddleware, errorHandler(listAddress));
usersRoutes.post('/update', authMiddleware, adminMiddleware, errorHandler(updateUser));

export default usersRoutes;