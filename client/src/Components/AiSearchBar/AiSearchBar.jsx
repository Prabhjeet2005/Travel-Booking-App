import React, { useState } from "react";
import axios from "axios";
import { FilterContext, useFilter } from "../../context/FilterContext";
import { CategoryContext, useCategory } from "../../context/CategoryContextProvider";
import "./AiSearchBar.css";
import { useContext } from "react";

export const AiSearchBar = () => {
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Grab your existing contexts!
	const { filterDispatch } = useContext(FilterContext);
	const { setHotelCategory } = useContext(CategoryContext);

	const handleAiSearch = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		setIsLoading(true);
		try {
			// Send natural language to the backend
			const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}ai/search`, {
				query,
			});
			const filters = res.data;

			// Dynamically inject the AI's JSON directly into your existing Reducers!
			if (filters.city) {
				filterDispatch({ type: "CITY", payload: filters.city });
			}
			if (filters.propertyType) {
				setHotelCategory(filters.propertyType); // Uses your Category context
			}
			if (filters.maxPrice) {
				filterDispatch({
					type: "MAXIMUM_PRICE",
					payload: [0, filters.maxPrice, 500],
				});
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

			setQuery(""); // Clear the input
		} catch (error) {
			console.error("AI Search failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="ai-search-container">
			<form onSubmit={handleAiSearch} className="ai-search-form">
				<div className="ai-input-wrapper">
					<span className="ai-sparkle-icon">✨</span>
					<input
						type="text"
						placeholder='Try: "Find me a pet-friendly villa in Goa under ₹5000..."'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="ai-input"
						disabled={isLoading}
					/>
					<button
						type="submit"
						className="ai-submit-btn"
						disabled={isLoading}>
						{isLoading ? "Thinking..." : "AI Search"}
					</button>
				</div>
			</form>
		</div>
	);
};
