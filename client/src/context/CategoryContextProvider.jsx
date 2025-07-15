import React, { createContext, useState } from 'react'

export const CategoryContext = createContext()

const CategoryContextProvider = ({children}) => {
  const [hotelCategory, setHotelCategory] = useState("")
  return (
    <CategoryContext.Provider value={{hotelCategory,setHotelCategory}}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider