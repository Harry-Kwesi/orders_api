import exppress from "express";
import upload from "../config/fileUpload.js";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const productsRouter = exppress.Router();

productsRouter.post(
  "/",
  isLoggedIn,
  // isAdmin,
  upload.array("files"),
  createProduct
);

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.put("/:id", isLoggedIn, isAdmin, updateProduct);
productsRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProduct);
export default productsRouter;
