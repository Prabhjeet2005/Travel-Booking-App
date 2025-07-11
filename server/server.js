require("dotenv").config();
require("./dbConnection");
const express = require("express");
const cookieParser = require("cookie-parser");

const hotelRouter = require("./routes/hotels.route");
const errorHandler = require("./utils/errorHandler");
const dataImportRouter = require("./routes/dataImport.route");
const categoryRouter = require("./routes/category.route");
const userRouter = require("./routes/user.route");
const wishlistRouter = require("./routes/wishlist.route");
const { errorController } = require("./controllers/error.controller");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/hotels", hotelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/dataImport", dataImportRouter);
app.use("/*splat",errorController)

app.use(errorHandler);

app.listen(process.env.PORT || 3500, () => {
	console.clear();
	console.log("Server Running");
});
