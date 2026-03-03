import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavBar } from "../../Components/index";
import SingleHotelImage from "../../Components/SingleHotel/SingleHotelImage";
import "./SingleHotelPage.css";
import SingleHotelDescription from "../../Components/SingleHotel/SingleHotelDescription";
import SingleHotelPrice from "../../Components/SingleHotel/SingleHotelPrice";

const SingleHotelPage = () => {
	const params = useParams();
	const { id } = params;
	const [singleHotel, setSingleHotel] = useState([]);

	const [itinerary, setItinerary] = useState(null);
	const [isGenerating, setIsGenerating] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_SERVER_URL}hotels/${id}`,
				);
				setSingleHotel(data.data || []);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [id]);

	const { name, state, city } = singleHotel;

	// ✅ NEW AI FUNCTION
	const handleGenerateItinerary = async () => {
		setIsGenerating(true);
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}ai/itinerary`,
				{
					hotelName: name,
					city: city,
					state: state,
				},
			);
			setItinerary(res.data.itinerary);
		} catch (error) {
			console.error("Failed to generate itinerary", error);
			alert("AI Servers are busy right now. Try again in a moment!");
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<>
			<NavBar />
			<section className="main-page-container">
				<SingleHotelImage singleHotel={singleHotel} />
				<section className="hotel-description-container">
					<SingleHotelDescription singleHotel={singleHotel} />
					<SingleHotelPrice singleHotel={singleHotel} />
				</section>
			</section>
			{name && (
				<div className="max-w-7xl mx-auto mt-12 mb-12 px-4 font-sans relative z-10">
					{/* 1. The Trigger Button */}
					{!itinerary && (
						<button
							onClick={handleGenerateItinerary}
							disabled={isGenerating}
							className="relative overflow-hidden group w-full max-w-2xl mx-auto bg-orange-400 text-white font-bold py-5 rounded-2xl shadow-2xl transition-all hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:-translate-y-1 flex justify-center items-center gap-3 text-lg border border-slate-800 disabled:opacity-80 disabled:hover:translate-y-0">
							{/* Button Hover Gradient */}
							<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							<span className="relative z-10 flex items-center gap-3">
								{isGenerating ? (
									<>
										<svg
											className="animate-spin h-6 w-6 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24">
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										Crafting your perfect trip...
									</>
								) : (
									<>
										<span className="text-2xl drop-shadow-lg">✨</span>
										Generate AI Travel Itinerary
									</>
								)}
							</span>
						</button>
					)}

					{/* 2. The Result UI */}
					{itinerary && (
						<div className="bg-white rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden animate-fade-in-up">
							{/* Decorative Blur */}
							<div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

							{/* Header */}
							<div className="flex justify-between items-start mb-10 relative z-10 border-b border-gray-100 pb-6">
								<div className="text-center flex flex-col items-center">
									<h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-orange-300 flex items-center gap-3">
										<span className="text-3xl">📍</span> Your {city} Guide
									</h2>
									<p className="text-gray-500 mt-2 font-medium">
										Curated exclusively for your stay at{" "}
										<span className="text-indigo-600 font-bold">
											{name}
										</span>
									</p>
								</div>
								<button
									onClick={() => setItinerary(null)}
									className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-colors shadow-sm border border-gray-200"
									title="Close Itinerary">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</button>
							</div>

							{/* Days Grid */}
							<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
								{itinerary.map((day, idx) => (
									<div
										key={idx}
										className="bg-slate-50/50 rounded-3xl p-2 border border-slate-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
										<div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm">
											{/* Day Badge */}
											<div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 font-black tracking-wide rounded-lg text-sm mb-8 border border-indigo-100/50 shadow-sm">
												{day.day.toUpperCase()}
											</div>

											{/* Timeline Layout */}
											<div className="space-y-8 pl-2">
												{/* Morning */}
												<div className="relative pl-8 before:absolute before:left-[-4px] before:top-8 before:bottom-[-40px] before:w-[2px] before:bg-gradient-to-b before:from-amber-200 before:to-orange-400">
													<span className="absolute left-[-15px] top-[-2px] text-2xl bg-white p-1 rounded-full shadow-sm border border-gray-50 z-10">
														🌅
													</span>
													<h4 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wider">
														Morning
													</h4>
													<p className="text-slate-600 text-sm leading-relaxed">
														{day.morning}
													</p>
												</div>

												{/* Afternoon */}
												<div className="relative pl-8 before:absolute before:left-[-4px] before:top-8 before:bottom-[-40px] before:w-[2px] before:bg-gradient-to-b before:from-orange-400 before:to-indigo-300">
													<span className="absolute left-[-15px] top-[-2px] text-2xl bg-white p-1 rounded-full shadow-sm border border-gray-50 z-10">
														☀️
													</span>
													<h4 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wider">
														Afternoon
													</h4>
													<p className="text-slate-600 text-sm leading-relaxed">
														{day.afternoon}
													</p>
												</div>

												{/* Evening */}
												<div className="relative pl-8">
													<span className="absolute left-[-15px] top-[-2px] text-2xl bg-white p-1 rounded-full shadow-sm border border-gray-50 z-10">
														🌙
													</span>
													<h4 className="font-bold text-slate-900 text-sm mb-2 uppercase tracking-wider">
														Evening
													</h4>
													<p className="text-slate-600 text-sm leading-relaxed">
														{day.evening}
													</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default SingleHotelPage;
