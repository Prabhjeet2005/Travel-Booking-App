const express = require("express")
const authMiddleware = require("../middleware/authMiddleware")
const { getAllOrdersController, addOrdersController } = require("../controllers/order.controller")

const orderRouter = express.Router()

orderRouter.get("/getAllOrders",authMiddleware,getAllOrdersController )
orderRouter.post("/addOrders",authMiddleware,addOrdersController )

module.exports = orderRouter