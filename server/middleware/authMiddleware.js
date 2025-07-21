const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwtUtil");
const { errorCreator } = require("../utils/responseCreator");

const authMiddleware = async (req,res,next) => {
	try {
		console.log("Cookies on Incoming Requests: ",req.cookies)
		const { authToken } = req.cookies;
		if(!authToken){
			console.error("authToken Missing In cookies!!!!")
			errorCreator("authToken Missing in Cookies",401)
		}
		const data = verifyToken(authToken);
		if(!data){
			console.error("authToken Verify Error")
			errorCreator("authToken Verify Error")
		}
		const { email } = data;
		const { password, ...userData } = await UserModel.findUser(email);
		res.locals.user = { email };
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authMiddleware;
