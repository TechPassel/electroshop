// import Axios from "axios";
import Axios from '../utils/customAxios';
import { CLEAR_ORDER, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants";
import { CLEAR_CART } from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { data } = await Axios.post('/order', order);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: CLEAR_CART
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const clearOrder = () => async (dispatch) => {
    dispatch({ type: CLEAR_ORDER });
}
