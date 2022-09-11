import {ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO} from '../constants/cartConstants.js'

export const cartReducer=(state={cartItems:[],shippingInfo:{}},action)=>{

        switch(action.type){
            case ADD_TO_CART:
                //storing the payload item in a variable
                const item=action.payload ;
               

               
                //check if all ready persent in cartItems
              let  isExist=state.cartItems.find((i)=>{
                    return i?._id===item._id;
                })

                // if exist then replace the item with new item 
                //which have new quntity
                if(isExist){
                    return {
                        ...state,
                        cartItems:state.cartItems.map((i)=>{
                           return  i?._id===isExist._id ? item :i ;
                        })
                    }

                }else{

                    //if not exist then add to items 
                    return {
                        ...state,
                        cartItems:[...state.cartItems,item]
                    }
                }
              case REMOVE_FROM_CART:
                  return {
                      ...state,
                      cartItems:state.cartItems.filter((i)=>{
                          return i._id !== action.payload;
                      })
                  
                  };
                 case SAVE_SHIPPING_INFO:
                     return {
                         ...state,
                         shippingInfo:action.payload

                     } ;


            default:
            return state;    
        }

}