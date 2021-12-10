import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    getAllProductsReducer,
    getProductByIdReducer,
    addProductReviewReducer,
    deleteProductReducer,
    addProductReducer,
    updateProductReducer
} from "./reducers/productReducer";
import { registerNewUserReducer, loginReducer, updateUserReducer, getAllUsersReducer, deleteUserReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducar';
import { placeOrderReducer, getOrdersByUserIdReducer, getOrderByIdReducer, getAllOrdersReducer } from './reducers/orderReducer'

const finalReducer = combineReducers({
    getAllProductsReducer: getAllProductsReducer,
    getProductByIdReducer: getProductByIdReducer,
    cartReducer: cartReducer,
    registerNewUserReducer: registerNewUserReducer,
    loginReducer: loginReducer,
    placeOrderReducer: placeOrderReducer,
    getOrdersByUserIdReducer: getOrdersByUserIdReducer,
    getOrderByIdReducer: getOrderByIdReducer,
    addProductReviewReducer: addProductReviewReducer,
    updateUserReducer: updateUserReducer,
    getAllUsersReducer: getAllUsersReducer,
    deleteUserReducer: deleteUserReducer,
    deleteProductReducer: deleteProductReducer,
    addProductReducer: addProductReducer,
    updateProductReducer: updateProductReducer,
    getAllOrdersReducer: getAllOrdersReducer
});

//for initial state
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

//The Initial State
const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginReducer: {
        currentUser: currentUser
    }
}

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(finalReducer, initialState, composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
));

export default store;