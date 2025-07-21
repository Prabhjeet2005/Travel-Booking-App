const UserModel = require("../models/user.model");
const { generateToken, verifyToken } = require("../utils/jwtUtil");
const { generatePassword, verifyPassword } = require("../utils/passwordUtil");
const { responseCreator, errorCreator } = require("../utils/responseCreator");

const signupController = async (req, res, next) => {
	try {
		const userData = req.body;
		const { password: userPassword } = userData;
		const hashedPwd = await generatePassword(userPassword);
		const updatedUserData = { ...userData, password: hashedPwd };
		const user = await UserModel.createUser(updatedUserData);

		res
			.status(201)
			.send(responseCreator("User Signned Up Successfully!", user));
	} catch (error) {
		next(error);
	}
};
const loginController = async (req, res, next) => {
	try {
		const { email, password: userPassword } = req.body;
		const user = await UserModel.findUser(email);
		const { password: hashedPwd, ...data } = user;
		const isPasswordSame = await verifyPassword(userPassword, hashedPwd);
		if (!isPasswordSame) {
			errorCreator("Invalid Credentials", 403);
		}
		const token = generateToken(user, "1d");
		res.cookie("authToken", token, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: "none", // allow cross‑site
			secure: true,
		});
		res.status(200).send(responseCreator("User Logged In Successfully!", data));
	} catch (error) {
		next(error);
	}
};
const loginWithTokenController = async (req, res, next) => {
	try {
		const { authToken } = req.cookies || {};
		const data = verifyToken(authToken);
		const { email } = data;
		const user = await UserModel.findUser(email);
		res
			.status(200)
			.send(responseCreator("LoggedIn via Token Successfully!", user));
	} catch (error) {
		next(error);
	}
};
const logoutController = async (req, res, next) => {
	try {
		res.clearCookie("authToken");
		res.status(200).send(responseCreator("Logged Out Successfully"));
	} catch (error) {
		next(error);
	}
};

const addToWishlistController = async (req, res, next) => {
	try {
		const { _id: hotelId } = req.body;
		const { email } = res.locals.user;
		const wishlist = await UserModel.addWishlist(email, hotelId);
		res
			.status(201)
			.send(responseCreator("Hotel Added To Wishlist Successfully", wishlist));
	} catch (error) {
		next(error);
	}
};

const deleteFromWishlistController = async (req, res, next) => {
	try {
		const { email } = res.locals.user;
		const { id: hotelId } = req.params;
		const wishlist = await UserModel.deleteFromWishlist(email, hotelId);
		res
			.status(200)
			.send(
				responseCreator("Successfully Deleted Hotel From Wishlist", wishlist)
			);
	} catch (error) {
		next(error)
	}
};

const getWishlistController = async(req,res,next)=>{
	try {
		const {email} = res.locals.user;
		const wishlist = await UserModel.getWishlist(email);
		res.status(200).send(responseCreator("Displaying Wishlist Successful!",wishlist))
	} catch (error) {
		next(error)
	}
}
const getWishlistIdOnlyController = async (req, res, next) => {
	try {
		const { email } = res.locals.user;
		const wishlist = await UserModel.getWishlistById(email);
		res
			.status(200)
			.send(responseCreator("Displaying Wishlist Successful!", wishlist));
	} catch (error) {
		next(error);
	}
};

module.exports = {
	signupController,
	loginController,
	loginWithTokenController,
	logoutController,
	addToWishlistController,
	deleteFromWishlistController,
	getWishlistController,
	getWishlistIdOnlyController,
};
