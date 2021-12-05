import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
} from '../constants/productConstants'

// Notes
// Create a "reducer" function that determines what the new state
// should be when something happens in the app

// Reducers usually look at the type of action that happened
// to decide how to update the state

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // Do something here based on the different types of actions
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    // set products to initial state

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    //return back a payload of data - what we get from the api call

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
    // If this reducer doesn't recognize the action type, or doesn't
    // care about this specific action, return the existing state unchanged
  }
}

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state }

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }

    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
