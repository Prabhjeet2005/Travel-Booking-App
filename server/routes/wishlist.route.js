const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addToWishlistController, deleteFromWishlistController, getWishlistController, getWishlistIdOnlyController } = require("../controllers/user.controller");

const wishlistRouter = express.Router();

wishlistRouter.post("/addToWishlist", authMiddleware, addToWishlistController);
wishlistRouter.delete(
	"/deleteFromWishlist/:id",
	authMiddleware,
	deleteFromWishlistController
);
wishlistRouter.get("/getWishlist", authMiddleware, getWishlistController);
wishlistRouter.get(
	"/getWishlistIdOnly",
	authMiddleware,
	getWishlistIdOnlyController
);

module.exports = wishlistRouter;
