const UserModel = require("../models/user.model");
const { responseCreator } = require("../utils/responseCreator");

const getAllOrdersController = async(req,res,next)=>{
  try {
    const {email} = res.locals.user;
    const orders = await UserModel.findAllOrders(email);
    res.status(200).send(responseCreator("Fetched All Orders Successfully",orders))
  } catch (error) {
    next(error)
  }
}
const addOrdersController = async (req, res, next) => {
	try {
		const { email } = res.locals.user;
    const data = req.body
		const orders = await UserModel.addOrders(email,data);
		res
			.status(200)
			.send(responseCreator("Added Order Successfully", orders));
	} catch (error) {
		next(error);
	}
};

module.exports = { getAllOrdersController, addOrdersController };