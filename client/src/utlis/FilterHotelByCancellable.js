export const getFilteredHotelCancellable = (hotels,cancel)=>{
  if(cancel === null){
    return hotels
  }
  return hotels.filter((hotel) => hotel.isCancelable === cancel);
}