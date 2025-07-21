import React, { useContext, useEffect, useState } from "react";
import { HotelCard, NavBar } from "../../Components";
import useApi from "../../useApi";
import { ENDPOINTS, REQUEST_TYPES } from "../../apiUtils";
import { WishlistContext } from "../../context/WishlistContext";
import { Ban, Heart, HeartFill } from "react-bootstrap-icons";
import "./Wishlist.css"
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Wishlist = () => {
  const [wishlistCalled, setWishlistCalled] = useState([]);
  const {makeRequest:getWishlistData} = useApi(ENDPOINTS.WISHLIST.DISPLAY,REQUEST_TYPES.GET)
  const {wishlist,wishlistDispatch} = useContext(WishlistContext)
  const {isUserLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  useEffect(() => {
    try {
      if(isUserLoggedIn){
      (async()=>{
        const payload = await getWishlistData();
        setWishlistCalled(payload.wishlist);
      })()}
      else{
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  }, [wishlist,isUserLoggedIn])

	return (
		<>
			<NavBar />
			<section className="main-page-container-wishlist">
				<section className="wishlist-title">
					Your Wishlist <HeartFill className="heart-icons-wishlist" />{" "}
				</section>
				<section className="hotel-card-container-wishlist">
					{wishlistCalled && wishlistCalled.length > 0 ? (
						wishlistCalled.map((hotel) => (
							<HotelCard key={hotel._id} hotel={hotel} />
						))
					) : (
						<section className="ban-icons">
							No Hotels Found <Ban />{" "}
						</section>
					)}
				</section>
			</section>
		</>
	);
};

export default Wishlist;
