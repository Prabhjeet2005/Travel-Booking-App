require("dotenv").config();
require("./dbConnection");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const hotelRouter = require("./routes/hotels.route");
const errorHandler = require("./utils/errorHandler");
const dataImportRouter = require("./routes/dataImport.route");
const categoryRouter = require("./routes/category.route");
const userRouter = require("./routes/user.route");
const wishlistRouter = require("./routes/wishlist.route");
const { errorController } = require("./controllers/error.controller");
const orderRouter = require("./routes/order.route");
const aiRouter = require("./routes/ai.route");
const app = express();

app.use(
	cors({
		origin:process.env.NODE_ENV === "development"?true: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/hotels", hotelRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/orders", orderRouter);
app.use("/api/dataImport", dataImportRouter);
app.use("/api/ai", aiRouter);
app.use("/api/*splat", errorController);

app.use(errorHandler);

if (process.env.NODE_ENV === "development"){

	app.listen(process.env.PORT || 3500, () => {
		console.clear();
		console.log("Server Running");
	});
}else{
	module.exports = app;
}

