import Axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const response = await Axios.get('/product');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const productDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const response = await Axios.get(`/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data.message
          : error.message,
    });
  }
};
