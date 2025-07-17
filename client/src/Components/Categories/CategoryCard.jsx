import React, { useContext } from 'react'
import "./CategoryCard.css";
import { CategoryContext } from '../../context/CategoryContextProvider';

const CategoryCard = ({ category }) => {
	const {hotelCategory} = useContext(CategoryContext)
	const isActive = hotelCategory === category;
	const selectedClass = isActive ? "category-item category-item-selected" : "category-item"
	return <div className={selectedClass}>{category}</div>
};

export default CategoryCard