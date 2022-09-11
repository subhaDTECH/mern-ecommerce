import React,{useEffect} from 'react'
import "./Myorder.css";
import {useDispatch, useSelector} from "react-redux";
import { MygetOrders} from "../../../actions/paymentAction";
import Loader from '../Home/Loader';

const MyOrder = () => {
    const dispatch=useDispatch();
    const {myOrders,loading}=useSelector((state)=>state.myorderData)

    console.log(myOrders)
    useEffect(()=>{
       dispatch(MygetOrders());
    },[dispatch])

    if(loading){
        return <Loader/>
    }
  return (
    <div className='myorder__containeer'>
         <h3>MyOrders</h3>


         {
            myOrders && myOrders.length >0  && myOrders.map((Order)=>{
                return (
            <div key={Order._id} className='order__card'>
            {
                Order.orderItems && Order.orderItems.map((item,index)=>{
                    return (
                         <div className='mini_box'>
                           <img key={index} src={item.image} alt="" />
                           <p>{item.name}</p>  
                         </div>
                    )
                })
            }
              
              <div className='ordeer__info'>
                      <h1>OrderId # : {Order._id}</h1>
                    
                      <p>PaidAt:Paid</p>
                       <p>createdAt: {Order.createdAt}</p>
                       <p>DeleveredAt: 23/3/22</p>
                       <p>Total Amount:  ₹{Order.totalPrice}</p>
                      <p>orderStatus : <span className='Deliveer__track'> {Order.orderStatus}</span></p>
              </div>
        </div>

                )
            })
         }
       
       
      


    </div>
  )
}

export default MyOrder