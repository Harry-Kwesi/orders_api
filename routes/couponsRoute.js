import exppress from "express";
import {
  createCoupon,
  getAllCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} from "../controllers/couponsController.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const couponsRouter = exppress.Router();

couponsRouter.post("/", isLoggedIn, createCoupon);

couponsRouter.get("/", getAllCoupons);
couponsRouter.put("/update/:id", isLoggedIn, isAdmin, updateCoupon);
couponsRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCoupon);
couponsRouter.get("/single", getCoupon);
export default couponsRouter;
