import axios from 'axios'
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from '../constants/productConstants'

// creating action function
// Actions are plain JavaScript objects that have a type field.
// An event that describes something that happened in the application.

export const productsList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    //this swill set off respective reducer, loading = true, empty array of products
    const { data } = await axios.get('api/products/')
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    // has now set state to data
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
