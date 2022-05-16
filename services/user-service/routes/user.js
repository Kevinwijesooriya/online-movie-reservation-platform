import { Router } from "express";
import userController from "../controllers/userController.js";
const userRoute = Router();

userRoute.post("/api/user/registration", userController.register);
userRoute.post("/api/user/signin", userController.signing);
userRoute.get("/api/auth/signout", userController.signout);
userRoute.post("/api/user/updateInfo", userController.update);
userRoute.post("/api/user/resetPassword", userController.resetPassword);

export default userRoute;