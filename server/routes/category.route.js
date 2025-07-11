const express = require("express");
const { displayCategoryController } = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.get("/displayCategories", displayCategoryController);

module.exports = categoryRouter;
