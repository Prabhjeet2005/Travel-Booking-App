const express = require("express");
const {
	displayHotelController,
	findHotelByIDController,
} = require("../controllers/hotels.controller");

const hotelRouter = express.Router();

hotelRouter.get("/displayHotels", displayHotelController);
hotelRouter.get("/:id", findHotelByIDController);

module.exports = hotelRouter;
