const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addToWishlistController, deleteFromWishlistController, getWishlistController } = require("../controllers/user.controller");

const wishlistRouter = express.Router();

wishlistRouter.post("/addToWishlist", authMiddleware, addToWishlistController);
wishlistRouter.delete(
	"/deleteFromWishlist/:id",
	authMiddleware,
	deleteFromWishlistController
);
wishlistRouter.get("/getWishlist", authMiddleware, getWishlistController);

module.exports = wishlistRouter;
