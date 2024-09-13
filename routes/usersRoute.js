import exppress from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  // updateShippingAddresctrl,
} from "../controllers/usersController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRoutes = exppress.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/profile", isLoggedIn, getUserProfile);
// userRoutes.put("/update/shipping", isLoggedIn, updateShippingAddresctrl);
export default userRoutes;
