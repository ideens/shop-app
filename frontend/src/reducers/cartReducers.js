import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants.js'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existsItem = state.cartItems.find(
        (value) => value.product === item.product
      )

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((value) =>
            value.product === existsItem.product ? item : value
          ),
          // if its not the correct product, return original product
          // if it is, fins the new product to update and replace with new item
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          // if item doesn't exist already
          // returns original state and original cart items
          // adds in new item
        }
      }

    default:
      return state
  }
}