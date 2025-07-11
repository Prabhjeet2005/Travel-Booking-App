const { Schema, model } = require("mongoose");
const { errorCreator } = require("../utils/responseCreator");

const categorySchema = new Schema(
	{
		category: { type: String, required: true },
	},
	{ timestamps: true }
);

categorySchema.statics.uploadData = async (categoryData) => {
	await CategoryModel.deleteMany();
	const uploaded = await CategoryModel.insertMany(categoryData);
	if (!uploaded) {
		errorCreator("Category Uploaded Error", 400);
	}
	return uploaded;
};

categorySchema.statics.displayCategories = async ()=>{
	const categories = await CategoryModel.find({})
	if(!categories){
		errorCreator("Error Displaying Categories",400)
	}
	return categories
}

const CategoryModel = model("Category", categorySchema);
module.exports = CategoryModel;
