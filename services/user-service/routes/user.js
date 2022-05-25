import { Router } from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/authAdmin.js";
const userRoute = Router();

userRoute.post("/api/user/registration", userController.register);
userRoute.post("/api/user/signin", userController.signing);
userRoute.get("/api/auth/signout", userController.signout);
userRoute.post("/api/user/updateInfo",auth, userController.update);
userRoute.post("/api/user/resetPassword", userController.resetPassword);
userRoute.get('/api/user/infor', auth,  userController.getUser);
userRoute.patch('/api/user/addcart', auth,  userController.addCart);

userRoute.patch('/api/admin/userUpdate/:id',auth,admin, userController.updateUserRole);
userRoute.get('/api/admin/getusers', userController.getAllUsers);
userRoute.delete('/api/admin/deleteuser/:id',userController.deleteUser);

export default userRoute;