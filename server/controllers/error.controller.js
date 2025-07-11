const { errorCreator } = require("../utils/responseCreator")

const errorController = async (req,res,next)=>{
  try {
    errorCreator("Page Not Found",400)
  } catch (error) {
    next(error)
  }
}

module.exports = {errorController}