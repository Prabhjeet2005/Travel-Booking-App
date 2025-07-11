const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwtUtil");

const authMiddleware = async (req,res,next) => {
	try {
		const { authToken } = req.cookies;
		const data = verifyToken(authToken);
		const { email } = data;
		const { password, ...userData } = await UserModel.findUser(email);
		res.locals.user = { email };
		next();
	} catch (error) {
		next(error);
	}
};

module.exports = authMiddleware;
