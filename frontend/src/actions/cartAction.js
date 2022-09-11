import {ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO} from '../constants/cartConstants.js'
import axios from "axios"

//store shipping info
export  const saveShippingInfo=(data)=>async(dispatch)=>{
    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,
    });

    localStorage.setItem('shippingInfo',JSON.stringify(data));



}










// export const AdditemsToCart=(id,quantity)=>async(dispatch,getState)=>{
export const AddItemsToCart=(id,quantity)=> async(dispatch,getState)=>{
   

    const res=await axios.get(`/api/v1/product/${id}`);
    const newData=res.data.ProductData;


  //dispacth the action add to cart with product detials

    dispatch({
        type:ADD_TO_CART,
        // payload:{
            
        //     product:newData._id,
        //     name:newData.name,
        //     price:newData.price,
        //     image:newData.images[0].url,
        //     stock:newData.stock,
       
        //   newData,
        //     quantity
        // }
        payload:{
            _id:res.data.ProductData._id,
            name:res.data.ProductData.name,
            price:res.data.ProductData.price,
            stock:res.data.ProductData.stock,
            image:res.data.ProductData.images[0].url,
            quantity
        }
    });


    //store the items in localstorage
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))



}



export const removeFromCart=(id)=>async (dispatch,getState)=>{

    dispatch({
        type:REMOVE_FROM_CART,
        payload:id
    });

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}