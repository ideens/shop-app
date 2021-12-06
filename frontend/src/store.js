import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

// states
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
})

//loading local storage data into initial state
const storageItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

// if items exists, get them and parse them. if not, set it empty array

const initialState = {
  cart: { cartItems: storageItems },
}

const middleware = [thunk]

//creating store with set parameters
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// make the constants, create the reducer, add it to store, make the action
