const aiService = require("../services/ai.service");

const semanticSearch = async (req, res) => {
	try {
		const { query } = req.body;
		if (!query)
			return res.status(400).json({ message: "Search query is required" });

		// Using 'groq' as the default provider. You can control this via process.env.AI_PROVIDER later!
		const filters = await aiService.parseSearchQuery(query, "groq");

		res.status(200).json(filters);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal server error during AI processing" });
	}
};

module.exports = { semanticSearch };
