const { Schema, model } = require("mongoose");
const { errorCreator } = require("../utils/responseCreator");

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: Number, required: true },
		password: { type: String, required: true },
		wishlist: [
			{
				type: Schema.Types.ObjectId,
				ref: "hotel",
			},
		],
	},
	{ timestamps: true }
);

userSchema.statics.createUser = async (userData) => {
	const { email } = userData;
	const existingUser = await UserModel.findOne({ email });
	if (existingUser) {
		errorCreator("User Already Exists", 402);
	}
	const user = await UserModel.create(userData);
  if(!user){
    errorCreator("Error While Creating User",400)
  }
	return user;
};

userSchema.statics.findUser = async(email)=>{
  const user = await UserModel.findOne({email})
  if(!user){
    errorCreator("User Doesn't Exist",400)
  }
  return user
}

userSchema.statics.addWishlist = async(email,hotelId)=>{
	const user = await UserModel.findOne({email})
	const isPresent = user.wishlist.find(
		item=>item._id.toString() === hotelId.toString()
	)
	if(isPresent){
		errorCreator("Hotel Already in Wishlist",400)
	}

	const addToWishlist = await UserModel.findOneAndUpdate(
		{ email },
		{ $addToSet: { wishlist: hotelId } },
		{ new: true }
	);
	if(!addToWishlist){
		errorCreator("Error While Adding To Wishlist")
	}
	return user;
}

userSchema.statics.deleteFromWishlist = async(email,hotelId)=>{
	const user = await UserModel.findOne({email})
	const isPresent = user.wishlist.find(
		item=>item._id.toString() === hotelId.toString()
	)
	if(!isPresent){
		errorCreator("Hotel Not Found in Wishlist",404)
	}
	
	const wishlist = await UserModel.findOneAndUpdate(
		{email},
		{$pull:{wishlist:hotelId}},
		{new:true}
	)
	if (!wishlist) {
		errorCreator("Error Deleting From Wishlist", 400);
	}
	return wishlist;
}

userSchema.statics.getWishlist = async(email)=>{
	const wishlist = await UserModel.findOne({email},{wishlist:1}).populate("wishlist")
	if(!wishlist){
		errorCreator("Error Displaying Wishlist",400)
	}
	return wishlist
}
userSchema.statics.getWishlistById = async (email) => {
	const wishlist = await UserModel.findOne({ email }, { wishlist: 1 })
	if (!wishlist) {
		errorCreator("Error Displaying Wishlist", 400);
	}
	return wishlist;
};

const UserModel = model("user", userSchema);
module.exports = UserModel;
