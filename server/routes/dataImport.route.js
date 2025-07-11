const express = require("express");
const {
	uploadController,
	uploadCategoriesController,
} = require("../controllers/dataImport.controller");


const dataImportRouter = express.Router()

dataImportRouter.post("/uploadData",uploadController)
dataImportRouter.post("/uploadCategories", uploadCategoriesController);

module.exports = dataImportRouter;