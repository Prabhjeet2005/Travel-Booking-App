import { useContext, useEffect, useState } from "react";
import useApi from "../../useApi";
import { ENDPOINTS } from "../../apiUtils";
import CategoryCard from "./CategoryCard";
import "../style.css";
import { ArrowLeftCircle, ArrowRightCircle } from "react-bootstrap-icons";
import { CategoryContext } from "../../context/CategoryContextProvider";

export const Categories = () => {
	const [categories, setCategories] = useState([]);
	const { makeRequest: fetchCategories } = useApi(ENDPOINTS.CATEGORIES.DISPLAY);
	const [categoriesToShow, setCategoriesToShow] = useState(0);
	const { hotelCategory, setHotelCategory } = useContext(CategoryContext);

	useEffect(() => {
		(async () => {
			const category = await fetchCategories();
			setCategories(category.slice(categoriesToShow, categoriesToShow + 8));
		})();
	}, [categoriesToShow]);
	// console.log(categories);

	const showMoreCategoriesLeft = () => {
		setCategoriesToShow((prev) => prev - 8);
	};
	const showMoreCategoriesRight = () => {
		setCategoriesToShow((prev) => prev + 8);
	};
	const handleCategoryClick = (category) => {
		setHotelCategory(category);
	};

  const handleClearCategory = () => {
		setHotelCategory("");
	};


	return (
		<section className="category-outer-container">
			<section className="category-heading">Categories</section>
			<section className="category-container">
				{categoriesToShow >= 8 && (
					<button
						onClick={showMoreCategoriesLeft}
						className="category-button-left">
						<ArrowLeftCircle />{" "}
					</button>
				)}
				{categories &&
					categories.map((item) => (
						<span onClick={() => handleCategoryClick(item.category)}>
							<CategoryCard key={item._id} category={item.category} />
						</span>
					))}
				{categoriesToShow - 8 < categories.length && (
					<button
						onClick={showMoreCategoriesRight}
						className="category-button-right">
						<ArrowRightCircle />
					</button>
				)}
			</section>
			{hotelCategory !== "" && (
				<button onClick={handleClearCategory} className="clear-category">Clear</button>
			)}
		</section>
	);
};
