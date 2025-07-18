const { Schema, model } = require("mongoose");

const hotelSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		image: { type: String, required: true },
		imageArr: { type: Array, required: true },
		address: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		country: { type: String, required: true },
		price: { type: Number, required: true },
		rating: { type: Number, required: true },
		numberOfBathrooms: { type: Number, required: true },
		numberOfBeds: { type: Number, required: true },
		numberOfguest: { type: Number, required: true },
		numberOfBedrooms: { type: Number, required: true },
		numberOfStudies: { type: Number, required: true },
		hostName: { type: String, required: true },
		hostJoinedOn: { type: String, required: true },
		ameneties: { type: Array, required: true },
		healthAndSafety: { type: Array, required: true },
		houseRules: { type: Array, required: true },
		propertyType: { type: String, required: true },
		isCancelable: { type: Boolean, required: true },
	},
	{ timestamps: true }
);

hotelSchema.statics.uploadData = async (hotelData) => {
	await HotelModel.deleteMany();
	const hotels = await HotelModel.insertMany(hotelData);
	return hotels;
};

hotelSchema.statics.findHotels = async (category) => {
	if(category === ""){
		return await HotelModel.find({})
	}
	const hotels = await HotelModel.find({ category });
	if (!hotels) {
		errorCreator("Error Getting Hotels", 500);
	}
	return hotels;
};

hotelSchema.statics.findHotelByID = async (id) => {
	const hotel = await HotelModel.findById(id);
	if (!hotel) {
		errorCreator("No Such Hotel Exists", 404);
	}
	return hotel;
};

hotelSchema.statics.findHotelByAddress = async (address) => {
	if(address === ""){
		return await HotelModel.find({})
	}
	const hotels = await HotelModel.find({ address });
	if (!hotels) {
		errorCreator("No Hotel Found", 400);
	}
	return hotels;
};

// saves in MongoDB as hotels
const HotelModel = model("hotel", hotelSchema);

module.exports = HotelModel;
