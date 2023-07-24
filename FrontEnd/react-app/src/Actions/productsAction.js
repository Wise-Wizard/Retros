import axios from "axios";
import {
  ADMIN_PRODUCT_DELETE_REQUEST,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAILURE,
} from "../Constants/adminConstants";
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

//Admin Product Delete
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`http://localhost:8080/api/products/${id}`, config);

    const { data } = await axios.get(`http://localhost:8080/api/products`, config);
    dispatch({ type: ADMIN_PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_DELETE_FAILURE, payload: error.message });
  }
};
export default productListAction;
