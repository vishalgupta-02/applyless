import express from "express";
import { loginUser, registerUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", verifyToken, (req, res) => {
  res.send("This is the testing environment");
});

export default userRouter;
