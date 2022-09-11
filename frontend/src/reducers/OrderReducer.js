import {
    MYORDER_RQUEST,
    MYORDER_SUCCESS,
    MYORDER_FAIL,
    CLEAR_ERRORS,
    ALL_ORDER_RQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL
   
  } from "../constants/orderConstants";



  export const OrderReducer=(state = { myOrders: [] }, action)=>{

    switch(action.type){

       case  MYORDER_RQUEST:
           return {
               loading:true,
               myOrders:[],
           };

           case  MYORDER_SUCCESS:
            return {
                loading:false,
                myOrders:action.payload,
                
            };

            case   MYORDER_FAIL:
            return {
                loading:false,
                error:action.payload,
            };

            case   CLEAR_ERRORS:
            return {
               ...state,
                error:null,
            };


            default:
                return state;


    }


}





export const AllOrderReducer=(state = { AllOrders: [] }, action)=>{

    switch(action.type){

       case ALL_ORDER_RQUEST:
           return {
               loading:true,
               AllOrders:[],
           };

           case ALL_ORDER_SUCCESS:
            return {
                loading:false,
                AllOrders:action.payload,
                
            };

            case  ALL_ORDER_FAIL:
            return {
                loading:false,
                error:action.payload,
            };

            case   CLEAR_ERRORS:
            return {
               ...state,
                error:null,
            };


            default:
                return state;


    }


  



}