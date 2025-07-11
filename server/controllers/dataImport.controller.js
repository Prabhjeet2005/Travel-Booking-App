const CategoryModel = require("../models/category.model");
const HotelModel = require("../models/hotels.model");
const categories = require("../utils/categorydata");
const hotelDataRaw = require("../utils/data");
const { responseCreator, errorCreator } = require("../utils/responseCreator");

const uploadController = async (req, res, next) => {
	try {
		const hotelData = hotelDataRaw.data;
		const uploaded = await HotelModel.uploadData(hotelData);
		res.status(201).send(responseCreator("Hotel Data Uploaded", uploaded));
	} catch (error) {
		next(error);
	}
};

const uploadCategoriesController = async (req, res, next) => {
	try {
		const categoryData = categories.data;
		const uploadedCategory = await CategoryModel.uploadData(categoryData);
		if (!uploadedCategory) {
			errorCreator("Error Uploading Categories",400);
		}
		res
			.status(201)
			.send(
				responseCreator("Categories Uploaded Successfully!", uploadedCategory)
			);
	} catch (error) {
		next(error);
	}
};

module.exports = { uploadController, uploadCategoriesController };
