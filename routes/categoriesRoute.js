import exppress from "express";
import catetgoryFileUpload from "../config/categoryUpload.js";
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoriesRouter = exppress.Router();

categoriesRouter.post(
  "/",
  isLoggedIn,
  catetgoryFileUpload.single("file"),
  createCategory
);
categoriesRouter.get("/", getAllCategories);
categoriesRouter.get("/:id", getSingleCategory);
categoriesRouter.delete("/:id", deleteCategory);
categoriesRouter.put("/:id", updateCategory);
export default categoriesRouter;
