export const getFilteredHotelByRating = (hotels,rating)=>{
  rating = +rating.split("+")[0]
  return hotels.filter((hotel)=>hotel.rating >= rating)
}