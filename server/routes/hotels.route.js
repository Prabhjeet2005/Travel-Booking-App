const express = require("express");
const {
	displayHotelController,
	findHotelByIDController,
	findHotelByAddressController,
} = require("../controllers/hotels.controller");

const hotelRouter = express.Router();

hotelRouter.get("/displayHotels", displayHotelController);
hotelRouter.get("/findAddress",findHotelByAddressController)

hotelRouter.get("/:id", findHotelByIDController);
module.exports = hotelRouter;
