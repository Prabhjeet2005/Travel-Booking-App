import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFilter } from "../../context/FilterContext";
import { useCategory } from "../../context/CategoryContextProvider";

export const AiChatWidget = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [messages, setMessages] = useState([
		{
			role: "ai",
			text: 'Hi! I am your AI Travel Agent. Tell me what you are looking for (e.g., "Pet friendly villa in Goa under ₹5000").',
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const { filterDispatch } = useFilter();
	const { setHotelCategory } = useCategory();
	const navigate = useNavigate();
	const messagesEndRef = useRef(null);

	// Auto-scroll to bottom of chat
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleAiSearch = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		const userText = query;
		setMessages((prev) => [...prev, { role: "user", text: userText }]);
		setQuery("");
		setIsLoading(true);

		try {
			const res = await axios.post("http://localhost:3500/api/ai/search", {
				query: userText,
			});
			const filters = res.data;

			let reply = "I found some great options! Applying your filters";

			// 1. Inject AI data into your existing Contexts
			if (filters.city) {
				filterDispatch({ type: "CITY", payload: filters.city });
				reply += ` in ${filters.city}`;
			}
			if (filters.propertyType) {
				setHotelCategory(filters.propertyType);
				reply += ` for a ${filters.propertyType}`;
			}
			if (filters.maxPrice) {
				filterDispatch({
					type: "MAXIMUM_PRICE",
					payload: [0, filters.maxPrice, 500],
				});
				reply += ` under ₹${filters.maxPrice}`;
			}
			if (filters.isCancelable !== undefined) {
				filterDispatch({
					type: "CANCELABLE",
					payload: filters.isCancelable,
				});
			}
			if (filters.rating) {
				filterDispatch({ type: "RATING", payload: filters.rating });
			}

			reply += "... redirecting you now!";
			setMessages((prev) => [...prev, { role: "ai", text: reply }]);

			// ✅ THE FIX: Wait 1.5 seconds for them to read the reply, then teleport them to the results!
			// Note: If your route for results is different (e.g., `/hotels/${filters.city}`), update the string below!
			setTimeout(() => {
				navigate("/hotels");
				setIsOpen(false); // Optionally close the chat when navigating
			}, 1500);
		} catch (error) {
			console.error("AI Search failed:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "ai",
					text: "Sorry, my servers are a bit busy. Please try again.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed bottom-6 right-6 z-[9999]">
			{/* The Chat Window */}
			{isOpen && (
				<div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 flex flex-col transform transition-all duration-300 origin-bottom-right">
					{/* Header */}
					<div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
						<div className="flex items-center gap-2">
							<span className="text-xl">✨</span>
							<h3 className="font-bold">AI Travel Agent</h3>
						</div>
						<button
							onClick={() => setIsOpen(false)}
							className="text-white hover:text-gray-200 text-xl font-bold">
							&times;
						</button>
					</div>

					{/* Chat Area */}
					<div className="p-4 h-80 overflow-y-auto bg-gray-50 flex flex-col gap-3">
						{messages.map((msg, idx) => (
							<div
								key={idx}
								className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white self-end rounded-br-sm" : "bg-white text-gray-800 border border-gray-100 self-start rounded-bl-sm shadow-sm"}`}>
								{msg.text}
							</div>
						))}
						{isLoading && (
							<div className="bg-white text-gray-500 border border-gray-100 self-start p-3 rounded-2xl rounded-bl-sm shadow-sm text-sm flex gap-1">
								<span className="animate-bounce">●</span>
								<span className="animate-bounce delay-100">●</span>
								<span className="animate-bounce delay-200">●</span>
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>

					{/* Input Area */}
					<form
						onSubmit={handleAiSearch}
						className="p-3 bg-white border-t border-gray-100 flex gap-2">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Type your request..."
							className="flex-1 bg-gray-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
							disabled={isLoading}
						/>
						<button
							type="submit"
							disabled={isLoading || !query.trim()}
							className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl px-4 py-2 font-bold transition-colors">
							{isLoading ? "..." : "Send"}
						</button>
					</form>
				</div>
			)}

			{/* The Floating Toggle Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 ${isOpen ? "bg-gray-800 text-white" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"}`}>
				{isOpen ? "✕" : "✨"}
			</button>
		</div>
	);
};
