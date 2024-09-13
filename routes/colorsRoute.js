import exppress from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  getSingleColor,
  updateColor,
} from "../controllers/colorsController.js";
import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
const colorRouter = exppress.Router();

isAdmin;
colorRouter.post("/", isLoggedIn, isAdmin, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColor);
colorRouter.put("/:id", isLoggedIn, isAdmin, updateColor);

export default colorRouter;
