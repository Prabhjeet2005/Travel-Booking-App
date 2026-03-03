import React, { useState } from "react";
import axios from "axios";
import { FilterContext, useFilter } from "../../context/FilterContext";
import { CategoryContext, useCategory } from "../../context/CategoryContextProvider";
import "./AiSearchBar.css";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const AiSearchBar = () => {
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	// Grab your existing contexts!
	const { filterDispatch } = useContext(FilterContext);
	const { setHotelCategory } = useContext(CategoryContext);
	const navigate = useNavigate();

	const handleAiSearch = async (e) => {
		e.preventDefault();
		if (!query.trim()) return;

		setIsLoading(true);
		setStatusMessage("✨ AI is analyzing your request...");

		try {
			const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}api/ai/search`, {
				query,
			});
			const filters = res.data;

			// ✅ FIX 1: CLEAR ALL PREVIOUS FILTERS BEFORE APPLYING NEW ONES!
			filterDispatch({ type: "CLEAR_ALL" });
			setHotelCategory(""); // Resets to "All Properties" by default!

			// 1. Handle Pricing Safely
			let min = 100;
			let max = 25000;
			if (typeof filters.minPrice === "number") min = filters.minPrice;
			if (typeof filters.maxPrice === "number") max = filters.maxPrice;

			if (filters.minPrice || filters.maxPrice) {
				filterDispatch({ type: "SET_PRICE_RANGE", payload: [min, max] });
			}

			// 2. Handle standard filters
			if (filters.propertyType) {
				filterDispatch({
					type: "PROPERTY",
					payload: filters.propertyType,
				});
				setHotelCategory(filters.propertyType);
			}

			if (filters.isCancelable) {
				filterDispatch({ type: "CANCEL_TOGGLE" });
			}

			if (filters.rating) {
				filterDispatch({ type: "RATING", payload: `${filters.rating}+` });
			}

			setStatusMessage("✅ Filters applied! Redirecting...");

			// 3. Navigate automatically
			setTimeout(() => {
				if (filters.city) {
					navigate(`/hotels/searchResults/${filters.city}`);
				} else {
					navigate("/");
				}
				setQuery("");
				setStatusMessage("");
			}, 1200);
		} catch (error) {
			console.error("AI Search failed:", error);
			setStatusMessage("❌ Sorry, my servers are busy. Try again.");
			setTimeout(() => setStatusMessage(""), 3000);
		} finally {
			setIsLoading(false);
		}
	};

	// ✅ NEW: Function to instantly reset everything
	const handleClearFilters = () => {
		filterDispatch({ type: "CLEAR_ALL" });
		setHotelCategory("");
		setQuery("");
		navigate("/");
		setStatusMessage("🧹 Filters cleared!");
		setTimeout(() => setStatusMessage(""), 2000);
	};

	return (
		<div className="ai-search-container">
			<div className="flex items-center gap-3 w-full">
				<form onSubmit={handleAiSearch} className="ai-search-form flex-1">
					<div className="ai-input-wrapper">
						<span className="ai-sparkle-icon">✨</span>
						<input
							type="text"
							placeholder='Try: "Find me a hotel between 5k and 10k..."'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="ai-input"
							disabled={isLoading}
						/>
						<button
							type="submit"
							className="ai-submit-btn"
							disabled={isLoading}>
							{isLoading ? "Searching..." : "AI Search"}
						</button>
					</div>
				</form>

				{/* ✅ NEW: Clear Button */}
				<button
					type="button"
					onClick={handleClearFilters}
					className="bg-white border-2 border-gray-200 hover:border-red-400 hover:text-red-500 hover:bg-red-50 text-gray-500 px-5 py-3 rounded-full font-bold transition-all shadow-sm flex items-center gap-2 h-full"
					title="Clear all filters">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path d="M3 6h18"></path>
						<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
						<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
						<line x1="10" y1="11" x2="10" y2="17"></line>
						<line x1="14" y1="11" x2="14" y2="17"></line>
					</svg>
					<span className="hidden sm:inline">Clear</span>
				</button>
			</div>

			{/* Status Badge */}
			{statusMessage && (
				<div className="flex justify-center mt-5">
					<div className="bg-indigo-50/90 border border-indigo-100 text-indigo-700 px-5 py-2 rounded-xl text-sm font-bold shadow-md backdrop-blur-sm tracking-wide transition-all animate-pulse">
						{statusMessage}
					</div>
				</div>
			)}
		</div>
	);
};;