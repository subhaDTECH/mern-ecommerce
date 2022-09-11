import {
    ALL_PRODUCT_RQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,


    PRODUCT_RQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,


    NEW_PRODUCT_RQUEST,
 NEW_PRODUCT_SUCCESS,
 NEW_PRODUCT_FAIL

} from "../constants/productContents"

export const productsReducer=(state = { products: [] }, action)=>{

    switch(action.type){

       case ALL_PRODUCT_RQUEST:
           return {
               loading:true,
               products:[],
           };

           case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productsCount,
                resultPerpage:action.payload.resultPerpage
            };

            case  ALL_PRODUCT_FAIL:
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


export const productReducer=(state = { product: {} }, action)=>{

    switch(action.type){

       case PRODUCT_RQUEST:
           return {
               loading:true,
               product:{},
           };

           case PRODUCT_SUCCESS:
            return {
                loading:false,
                product:action.payload,
               
            };

            case  PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload,
            };

            case   CLEAR_ERRORS:
            return {
               ...state,
                error:null,
            };

            case  NEW_PRODUCT_RQUEST:
                return {
                    ...state,
                    loading:true,
                    
                };

                case  NEW_PRODUCT_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                        newProduct:action.payload
                        
                    };

                    case NEW_PRODUCT_FAIL:
                        return {
                            ...state,
                            loading:false,
                            error:action.payload
                            
                        };


            default:
                return state;


    }


  



}