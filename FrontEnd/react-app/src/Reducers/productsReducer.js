import {
  ADMIN_PRODUCT_DELETE_FAILURE,
  ADMIN_PRODUCT_DELETE_REQUEST,
  ADMIN_PRODUCT_DELETE_SUCCESS,
} from "../Constants/adminConstants";

const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "PRODUCT_LIST_REQUEST":
      return { loading: true, products: [] };
    case "PRODUCT_LIST_SUCCESS":
      return { loading: false, products: action.payload };
    case "PRODUCT_LIST_FAILURE":
      return { loading: false, error: action.payload };
    case ADMIN_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return { loading: false, products: action.payload };
    case ADMIN_PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export default productListReducer;
