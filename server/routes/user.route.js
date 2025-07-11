const express = require("express");
const {
	signupController,
	loginController,
	loginWithTokenController,
	logoutController,
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
const userRouter = express.Router();

userRouter.post("/signup", signupController);
userRouter.post("/login", loginController);
userRouter.post("/loginWithToken", loginWithTokenController);
userRouter.post("/logout",authMiddleware ,logoutController);

module.exports = userRouter;
