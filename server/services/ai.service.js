const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const parseSearchQuery = async (
	query,
	availableLocations,
	provider = "groq",
) => {
	// ✅ FAANG-LEVEL PROMPT: Few-Shot Prompting + Intent Mapping
	const systemPrompt = `You are an elite semantic routing AI for a travel booking application. Your job is to convert natural language queries into a strict JSON filtering object.

    AVAILABLE LOCATIONS IN DATABASE: [${availableLocations.join(", ")}]
    
    RULES:
    1. You MUST output ONLY a valid JSON object. No markdown, no explanations, no extra keys.
    2. If a user asks for a specific place, you MUST map it to one of the AVAILABLE LOCATIONS. If it does not exist in the list (e.g., "Paris"), DO NOT hallucinate. Omit the city field entirely.
    3. INTENT MAPPING: If the query is vague (e.g., "tourist place", "beach", "mountains"), you MUST intelligently select the most fitting location from the AVAILABLE LOCATIONS list. Do not throw an error.
    4. Only include fields in the JSON if you have a valid value for them. Do NOT include empty strings, nulls, or a "message" field.

    ALLOWED JSON KEYS:
    - "city" (string): Must exactly match an item from the AVAILABLE LOCATIONS list.
    - "minPrice" (number): e.g., 1000. Must be a raw number, not an object.
    - "maxPrice" (number): e.g., 10000. Must be a raw number.
    - "propertyType" (string): Must be one of ['Hotel', 'Villa', 'Guest House', 'Resort', 'Apartment'].
    - "rating" (number): 1 to 5.
    - "isCancelable" (boolean): true or false.

    EXAMPLES:
    User: "Find me a cheap villa under 5000"
    Output: {"propertyType": "Villa", "maxPrice": 5000}

    User: "Find most tourist place"
    Output: {"city": "${availableLocations[0] || "Goa"}"} 

    User: "Hotels in Tokyo" (Assuming Tokyo is not in available list)
    Output: {"propertyType": "Hotel"} 
    
    User: "Show me something"
    Output: {}`;

	if (provider === "groq") {
		try {
			const completion = await groq.chat.completions.create({
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: query },
				],
				model: "llama-3.1-8b-instant",
				response_format: { type: "json_object" },
			});

			const parsedResponse = JSON.parse(
				completion.choices[0].message.content,
			);

			// Final safety net: Remove any rogue 'message' key if the AI still tries to sneak one in
			if (parsedResponse.message) delete parsedResponse.message;

			return parsedResponse;
		} catch (error) {
			console.error("Groq API Error:", error);
			throw new Error("AI parsing failed");
		}
	}
};

const generateItinerary = async (hotelName, city, state, provider = "groq") => {
	const systemPrompt = `You are an elite travel concierge. Generate a highly curated 3-day travel itinerary for a guest staying at "${hotelName}" in ${city}, ${state}. 
    
    You MUST respond with ONLY a valid JSON object matching this exact schema:
    {
      "itinerary": [
        {
          "day": "Day 1: Arrival & Exploration",
          "morning": "Activity description here...",
          "afternoon": "Activity description here...",
          "evening": "Dinner/Nightlife description here..."
        },
        // ... Day 2 and Day 3
      ]
    }`;

	if (provider === "groq") {
		try {
			const completion = await groq.chat.completions.create({
				messages: [
					{ role: "system", content: systemPrompt },
					{ role: "user", content: `Generate itinerary for ${hotelName} in ${city}` },
				],
				model: "llama-3.1-8b-instant",
				response_format: { type: "json_object" }, 
			});
            
			return JSON.parse(completion.choices[0].message.content);
		} catch (error) {
			console.error("Groq Itinerary Error:", error);
			throw new Error("Failed to generate itinerary");
		}
	}
};

module.exports = { parseSearchQuery, generateItinerary }; // Make sure to export it!
