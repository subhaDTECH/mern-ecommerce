import {createStore,combineReducers,applyMiddleware} from "redux"
import {composeWithDevTools} from  "redux-devtools-extension"
import thunk  from "redux-thunk";
import {productsReducer,productReducer,} from "./reducers/productReducer";
import {userReducer,forgotReducer} from "./reducers/userReducer.js";
import { cartReducer } from "./reducers/cartReducers";
import { OrderReducer,AllOrderReducer } from "./reducers/OrderReducer";
//middleware thunk made sync action creator to async action creator
const middleware= [thunk]

//create roootreducer
const rootReducer=combineReducers({
    products:productsReducer,
    product:productReducer,
    user:userReducer,
    forgotPass:forgotReducer,
    cart:cartReducer,
    myorderData:OrderReducer ,
    AllOrders:AllOrderReducer

});

//nintialState
const initialState={
    //cart if local storage  have items then store it on cartsItems 
    //else cartItems empty array []
    cart:{
        cartItems:localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')):[]
        // JSON.parse(localStorage.getItem('cartItems'))
        ,
        shippingInfo:localStorage.getItem('shippingInfo') ? 
        JSON.parse(localStorage.getItem('shippingInfo')):{}
    }
};

const store=createStore( rootReducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;
