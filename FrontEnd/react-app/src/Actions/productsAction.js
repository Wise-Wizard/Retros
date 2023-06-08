import axios from "axios";
const productListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_LIST_REQUEST" });
    const { data } = await axios.get("http://localhost:8080/api/products");
    dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "PRODUCT_LIST_FAILURE", payload: error.message });
  }
};
export default productListAction;
