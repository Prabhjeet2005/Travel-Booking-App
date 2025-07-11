const CategoryModel = require("../models/category.model");
const { responseCreator } = require("../utils/responseCreator");

const displayCategoryController = async (req, res, next) => {
	try {
		const category = await CategoryModel.displayCategories();
		res.status(200).send(responseCreator("Displaying Categories", category));
	} catch (error) {
		next(error);
	}
};

module.exports = {displayCategoryController}