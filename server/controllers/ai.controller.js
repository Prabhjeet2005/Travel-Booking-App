const aiService = require("../services/ai.service");
const Hotel = require("../models/hotels.model"); // ✅ Import your database model!

const semanticSearch = async (req, res) => {
	try {
		const { query } = req.body;
		if (!query)
			return res.status(400).json({ message: "Search query is required" });

		// ✅ Dynamically fetch all real locations currently in your database
		const availableCities = await Hotel.distinct("city");
		const availableStates = await Hotel.distinct("state");

		// Combine them into one array and remove duplicates
		const availableLocations = [
			...new Set([...availableCities, ...availableStates]),
		];

		// ✅ Pass the real locations into the AI Service
		const filters = await aiService.parseSearchQuery(
			query,
			availableLocations,
			"groq",
		);

		res.status(200).json(filters);
	} catch (error) {
		console.error("AI Controller Error:", error);
		res
			.status(500)
			.json({ message: "Internal server error during AI processing" });
	}
};

// Add this below semanticSearch
const createItinerary = async (req, res) => {
	try {
		const { hotelName, city, state } = req.body;
		if (!hotelName || !city) return res.status(400).json({ message: "Hotel data missing" });

		const itineraryData = await aiService.generateItinerary(hotelName, city, state, "groq");
		res.status(200).json(itineraryData);
	} catch (error) {
		console.error("Itinerary Error:", error);
		res.status(500).json({ message: "Failed to generate itinerary" });
	}
};

module.exports = { semanticSearch, createItinerary };

