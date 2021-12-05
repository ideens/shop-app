import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailReducer,
} from './reducers/productReducers'

// states
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
})

const initialState = {}

const middleware = [thunk]

//creating store with set parameters
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// make the constants, create the reducer, add it to store, make the action
