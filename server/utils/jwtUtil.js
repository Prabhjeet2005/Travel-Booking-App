const { sign, verify } = require("jsonwebtoken");
const { errorCreator } = require("./responseCreator");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userData, time = "1d") => {
  const {email} = userData;
	const token = sign({ email }, JWT_SECRET, { expiresIn: time });
	if (!token) {
		errorCreator("Error Creating Token", 400);
	}
	return token;
};

const verifyToken = (token) => {
  if(!token){
    errorCreator("Token Missing",400)
  }
	const isTokenValid = verify(token, JWT_SECRET);
  if(!isTokenValid){
    errorCreator("Token Invalid",400)
  }
	return isTokenValid;
};

module.exports = {generateToken,verifyToken}
