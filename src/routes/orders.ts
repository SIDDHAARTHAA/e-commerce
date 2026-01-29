import { Router } from "express";
import { errorHandler } from "../error-handler.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/admin.js";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders } from "../controllers/orders.js";

const ordersRoutes: Router = Router();

ordersRoutes.post('/', authMiddleware, errorHandler(createOrder));
ordersRoutes.get('/', authMiddleware, errorHandler(listOrders));
ordersRoutes.get('/index', authMiddleware, adminMiddleware, errorHandler(listAllOrders));
ordersRoutes.put('/:id/status', authMiddleware, adminMiddleware, errorHandler(changeStatus));
ordersRoutes.put('/:id/cancel', authMiddleware, errorHandler(cancelOrder));
ordersRoutes.get('/:id', authMiddleware, errorHandler(getOrderById));

export default ordersRoutes;
