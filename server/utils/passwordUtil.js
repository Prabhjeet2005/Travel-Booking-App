const { genSalt, compare, hash } = require("bcrypt");

const generatePassword = async (userPassword) => {
	try {
		const salt = await genSalt();
		const hashedPwd = await hash(userPassword, salt);
		return hashedPwd;
	} catch (error) {
		next(error);
	}
};

const verifyPassword = async (userPassword, hashedPwd) => {
	return await compare(userPassword, hashedPwd);
};

module.exports = { generatePassword, verifyPassword };
