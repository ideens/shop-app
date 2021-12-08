import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
} from '../constants/orderConstants'
import { CART_RESET } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    // find who is logged in currently
    // need to path in token to authorize
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    // sending info to view, including token we just got + id of user
    const { data } = await axios.post(`/api/orders/add/`, order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })

    dispatch({
      type: CART_RESET,
      payload: data,
    })

    localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}
