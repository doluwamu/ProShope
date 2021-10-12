import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from "../redux/constants/productConstants";

// export const extractServerError = (serverError) => {
//   let errors = [{ title: "Error!", detail: "Ooops, something went wrong!" }];
//   if (serverError && serverError.data && serverError.data.errors) {
//     errors = serverError.data.errors;
//   }
//   return errors;
// };

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/v1/products");
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const ProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch({
      type: 
      PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch ({ message }) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: message,
    });
  }
};
