import React from "react";
import { GiStrong } from "react-icons/gi";
import { useSelector } from "react-redux";
import "./OrderConfirm.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import axios from "axios"
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const OrderConfirm = () => {
  const userData=useSelector((state)=>state.user);
  console.log(userData)

const checkoutHandler=async(cart)=>{

  try{

    //calculate total amount
console.log("call")
const amount=cart.cartItems.reduce((accc, cur) => {
 accc = accc + cur.price * cur.quantity;
 return accc;
}, 0);

//get the key
const {data:{key}}=await axios.get('/api/v1/get/key');
console.log("key",key)

//create order

const {data:{order}}=await axios.post('/api/v1/checkout',{
 amount
})

console.log("order",order)

 var options = {
   "key": key, // Enter the Key ID generated from the Dashboard
   "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
   "currency": "INR",
   "name": "SUVA DULEY",
   "description": "Fashionista",
   "image": "https://example.com/your_logo",
   "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
   "callback_url": "http://localhost:4000/api/v1/payment/verify/",
   "prefill": {
       "name": userData?.user?.name,
       "email": userData?.user?.email,
      
   },
   "notes": {
       "address": "Razorpay Corporate Office"
   },
   "theme": {
       "color": "#3EB036"
   }
};
const rzp1 = new window.Razorpay(options);

rzp1.open();


//save in data base


const {data}=await axios.post('/api/v1/order/new',{
  shippingInfo:cart?.shippingInfo,
  orderItems:cart?.cartItems,
  amount:amount
});
console.log(data)
   

  }catch(e){
      console.log(e);
  }



}


  const cart = useSelector((state) => state.cart);
  console.log("cart data->", cart);
  return (
    <div className="order__confirm">
      <div className="order__left__side">
        {cart?.cartItems?.map((item,index) => {
          return (
            <Card key={index} className="each__item">
             
                <p>Product :  {item.name}</p>
                <img className="img__order" src={item.image} alt="" />
                <p>Quantity :{item.quantity}</p>
                <p>Price :₹{item.price}</p>
                <h5>Quantity X Price :₹{item.price * item.quantity}</h5>
           
            </Card>
          );
        })}
      </div>
      <div className="order__right__side">
        <div className="order__shipping__data">
          <h3>Shipping Address</h3>
          <hr />
          <p> Address : {cart?.shippingInfo.address}</p>
          <p>City : {cart?.shippingInfo.city}</p>
          <p>State : {cart?.shippingInfo.state}</p>
          <p>Country : {cart?.shippingInfo.country}</p>
          <p>Pincode : {cart?.shippingInfo.pinCode}</p>
          <p>Phone No : {cart?.shippingInfo.phoneNo}</p>

          <h3>Payment Info</h3>
          <hr />
          <p className="price">
            Total :₹{" "}
            <strong className="price__money">
              {cart.cartItems.reduce((accc, cur) => {
                accc = accc + cur.price * cur.quantity;
                return accc;
              }, 0)}{" "}
            </strong>{" "}
          </p>
        </div>
        <div className="order__paymant">
         
          <span> 
        <button className="pay__btn" id="rzp-button1"  onClick={()=>checkoutHandler(cart)}  >
            Pay Now & Get Access
        </button> 
        </span>
         
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
