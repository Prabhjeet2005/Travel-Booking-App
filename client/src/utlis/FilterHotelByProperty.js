export const getFilteredPropertyType = (hotels,property)=>{
  if(property === ""){
    return hotels;
  }
  return hotels.filter(
		(hotel) => property.toLowerCase() === hotel.propertyType.toLowerCase()
	);
}