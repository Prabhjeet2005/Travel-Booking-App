const dateReducer = (state,{type,payload})=>{
  switch (type) {
		case "OPEN_SEARCH_MODAL":
			return { ...state, isSearchModalOpen: !state.isSearchModalOpen };
		case "CHECK_IN":
      return {...state,checkInDate:payload}
		case "CHECK_OUT":
      return { ...state, checkOutDate: payload };
		default:
			break;
	}
}
export default dateReducer