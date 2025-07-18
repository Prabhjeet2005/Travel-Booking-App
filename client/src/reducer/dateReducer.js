const dateReducer = (state,{type,payload})=>{
  switch (type) {
		case "OPEN_SEARCH_MODAL":
			return { ...state, isSearchModalOpen: !state.isSearchModalOpen };
		case "CHECK_IN":
      return {...state,checkInDate:payload}
		case "CHECK_OUT":
      return { ...state, checkOutDate: payload };
		case "DESTINATION":
			return { ...state, destination: payload };
		case "GUESTS":
			return {...state,guests:payload}
		case "SHOW_DESTINATION_DROPDOWN":
			return { ...state, isDestinationDropdownOpen: true};
		case "HIDE_DESTINATION_DROPDOWN":
			return {...state, isDestinationDropdownOpen:false}
		default:
			break;
	}
}
export default dateReducer