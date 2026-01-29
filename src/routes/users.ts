import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { addAddress, changeUserRole, deleteAddress, getUserById, health, listAddress, listUsers, updateUser } from "../controllers/users.js";

const usersRoutes: Router = Router();

usersRoutes.get('/health', errorHandler(health));
usersRoutes.post('/address', authMiddleware, errorHandler(addAddress));
usersRoutes.delete('/address/:id', authMiddleware, errorHandler(deleteAddress));
usersRoutes.get('/address', authMiddleware, errorHandler(listAddress));
usersRoutes.post('/update', authMiddleware, errorHandler(updateUser));
usersRoutes.get('/', authMiddleware, adminMiddleware, errorHandler(listUsers));
usersRoutes.get('/:id', authMiddleware, adminMiddleware, errorHandler(getUserById));
usersRoutes.put('/:id/role', authMiddleware, adminMiddleware, errorHandler(changeUserRole));

export default usersRoutes;