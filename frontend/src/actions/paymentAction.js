// export const MYORDER_RQUEST="MYORDER_RQUEST";
// export const MYORDER_SUCCESS="MYORDER_SUCCESS";
// export const MYORDER_FAIL="MYORDER_FAIL";

import {
    MYORDER_RQUEST,
    MYORDER_SUCCESS,
    MYORDER_FAIL,

    ALL_ORDER_RQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,


DELETE_ORDER_REQUEST,
DELETE_ORDER_SUCCESS,
DELETE_ORDER_FAIL,

STATUS_EDIT_SUCCESS,
STATUS_EDIT_FAIL,
STATUS_EDIT_REQUEST
   
  } from "../constants/orderConstants";
  import axios from "axios";



  export const MygetOrders = () => async (dispatch) => {
    dispatch({
      type:  MYORDER_RQUEST,
    });
  
    try {
      const { data } = await axios.get(`/api/v1/me/orders`);
     
      console.log("action data", data.orders);
  
      dispatch({
        type:  MYORDER_SUCCESS,
        payload: data.orders,
      });
    } catch (error) {
      dispatch({
        type: MYORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  //get all orders
export const  getAllOrdersByAdmin= () => async (dispatch) => {
  dispatch({
    type: ALL_ORDER_RQUEST,
  });

  try {
    const { data } = await axios.get(`/api/v1/admin/orders`);
   
    console.log("action data", data);

    dispatch({
      type:  ALL_ORDER_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};





//delete order by admin 

  //get all product
  export const  deleteOrderByAdmin= (id) => async (dispatch) => {
    dispatch({
      type: DELETE_ORDER_REQUEST,
    });
  
    try {
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
     
      console.log("action data", data);
  
      dispatch({
        type:  DELETE_ORDER_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  //edit status

   //get all product
   export const  editStatusByAdmin= (id,status) => async (dispatch) => {
    dispatch({
      type: STATUS_EDIT_REQUEST,
    });
  
    try {
      const { data } = await axios.put(`/api/v1/admin/order/${id}`,{
        status
      });
     
      console.log("action data", data);
  
      dispatch({
        type:  STATUS_EDIT_SUCCESS,
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: STATUS_EDIT_FAIL,
        payload: error.response.data.message,
      });
    }
  };