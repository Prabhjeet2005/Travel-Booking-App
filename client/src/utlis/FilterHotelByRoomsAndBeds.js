export const getHotelsByRoomsAndBeds = (
	filterHotelByPriceRange,
	beds,
	bedrooms,
	bathrooms
) => {
  if(beds !== "Any"){beds=+beds.split("+")[0]}
  if (bedrooms !== "Any") {
		bedrooms = +bedrooms.split("+")[0];
	}
  if (bathrooms !== "Any") {
		bathrooms = +bathrooms.split("+")[0];
	}

	
	return filterHotelByPriceRange.filter((hotel) => 
		(beds === "Any" || +beds <= hotel.numberOfBeds) &&
			
		(bathrooms === "Any" || +bathrooms <= hotel.numberOfBathrooms) &&
			
		 (bedrooms === "Any" || +bedrooms <= hotel.numberOfBedrooms) 
		
	);
};


