import { createContext, useState } from "react";

const initialValue = {
  hotels:{}
}
export const HotelContext = createContext(initialValue)

 const HotelContextProvider = ({children})=>{
  const [hotels, setHotels] = useState({})
  return(
  <HotelContext.Provider value={{hotels,setHotels}}>
    {children}
  </HotelContext.Provider>
  )
 }

 export default HotelContextProvider