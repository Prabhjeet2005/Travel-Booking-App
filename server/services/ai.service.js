const Groq = require("groq-sdk");

// Initialize Groq (Ensure GROQ_API_KEY is in your .env file)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parseSearchQuery = async (query, provider = "groq") => {
	// 1. The Prompt Engineering
	const systemPrompt = `You are a semantic routing engine for a travel booking app. 
    Extract the search parameters from the user's query and output ONLY a valid JSON object. 
    Available fields to extract (only include them if explicitly mentioned by the user):
    - city (string, e.g., "Goa", "Delhi", "Mumbai", "Paris")
    - maxPrice (number, e.g., 5000)
    - propertyType (string, strictly choose from: 'Hotel', 'Villa', 'Guest House', 'Resort', 'Apartment')
    - rating (number, 1 to 5)
    - isCancelable (boolean)
    
    Do NOT wrap the output in markdown blocks or backticks. Output pure JSON only.`;

	// 2. The Strategy Pattern (Easily switch AI models here later)
	if (provider === "groq") {
		try {
			const completion = await groq.chat.completions.create({
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: query },
				],
				model: "llama-3.1-8b-instant", // Groq's lightning-fast, free model
				response_format: { type: "json_object" }, // Forces strict JSON output
			});
			return JSON.parse(completion.choices[0].message.content);
		} catch (error) {
			console.error("Groq API Error:", error);
			throw new Error("AI parsing failed");
		}
	}

	// Future-proofing for Gemini:
	if (provider === "gemini") {
		// Add Google Gemini logic here later
	}
};

module.exports = { parseSearchQuery };
