import exppress from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getSingleBrand,
  updateBrand,
} from "../controllers/brandsController.js";
import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const brandsRouter = exppress.Router();

brandsRouter.post("/", isLoggedIn, createBrand);
brandsRouter.get("/", getAllBrands);
brandsRouter.get("/:id", getSingleBrand);
brandsRouter.delete("/:id", isLoggedIn, isAdmin, deleteBrand);
brandsRouter.put("/:id", isLoggedIn, isAdmin, updateBrand);

export default brandsRouter;
