const CategoryModel = require("../models/category.model");
const HotelModel = require("../models/hotels.model");
const { responseCreator, errorCreator } = require("../utils/responseCreator");

const displayHotelController = async (req, res, next) => {
	/*  http://localhost:3500/ap/hotels?category=National+Parks */
	try {
		const category = req.query.category || "" ;
		const hotels = await HotelModel.findHotels(category);
		res.status(200).send(responseCreator("Displaying Hotels", hotels));
	} catch (error) {
		next(error);
	}
};

const findHotelByIDController = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!id) {
			errorCreator("Missing Hotel ID", 400);
		}
		const hotel = await HotelModel.findHotelByID(id);
		res.status(200).send(responseCreator("Displaying Specific Hotel", hotel));
	} catch (error) {
		next(error);
	}
};

const findHotelByAddressController = async(req,res,next)=>{
	try {
		const address = req.query.address || "";
		const hotels = await HotelModel.findHotelByAddress(address);
		res.status(200).send(responseCreator("Hotels Found",hotels))
	} catch (error) {
		next(error);
	}
}

module.exports = {
	displayHotelController,
	findHotelByIDController,
	findHotelByAddressController,
};
