export const filterReducer = (state, { type, payload }) => {
	switch (type) {
		case "TOGGLE_FILTER_WINDOW":
			return { ...state, isFilterWindowOpen: !state.isFilterWindowOpen };
		case "MIN_PRICE":
			return {
				...state,
				priceRange: [
					Math.min(
						payload.newValue[0],
						payload.priceRange[1] - payload.minDifference
					),
					payload.priceRange[1],
				],
			};
		case "MAX_PRICE":
			return {
				...state,
				priceRange: [
					payload.priceRange[0],
					Math.max(
						payload.newValue[1],
						payload.priceRange[0] + payload.minDifference
					),
				],
			};
		case "BEDROOM":
			return { ...state, numberOfBedrooms: payload };
		case "BEDS":
			return { ...state, numberOfBeds: payload };
		case "BATHROOM":
			return { ...state, numberOfBathrooms: payload };
		default:
			return state;
	}
};
