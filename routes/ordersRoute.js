import exppress from "express";
import {
  createOrder,
  getAllorders,
  getSingleOrder,
  updateOrder,
  getOrderStats,
} from "../controllers/ordersController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRouter = exppress.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.get("/", isLoggedIn, getAllorders);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStats);
orderRouter.put("/update/:id", isLoggedIn, updateOrder);
orderRouter.get("/:id", isLoggedIn, getSingleOrder);
export default orderRouter;
