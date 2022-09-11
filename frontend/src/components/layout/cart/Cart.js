import "./Cart.css";
import React, { useEffect, useState } from "react";
// import "./ProductDetail.css";
import ReviewCard from "../Home/ReviewCard";
import { useParams } from "react-router";
import { getProduct } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Home/Loader";
import Carousel from "react-material-ui-carousel";
import { AddItemsToCart, removeFromCart } from "../../../actions/cartAction";
import EmptyCart from "./EmptyCart";
import { Link } from "react-router-dom";



const Cart = () => {
  // const {id}=useParams();

  // const [quantity,setQuantity]=useState(1);
  const product = useSelector((state) => state.product.product);
  const cart = useSelector((state) => state.cart);
  console.log("cart data->", cart);
  const dispatch = useDispatch();

  const Increment = (id, stock, quantity) => {
    if (stock <= quantity) return;
    // setQuantity(quantity+1);
    let qu = quantity + 1;
    dispatch(AddItemsToCart(id, qu));
  };
  const Decrement = (id, quantity) => {
    if (1 >= quantity) return;
    let qu = quantity - 1;
    // setQuantity(quantity-1);
    dispatch(AddItemsToCart(id, qu));
    
  };

  // const AddtoCart=(id,quantity)=>{
  //     dispatch(AddItemsToCart(id,quantity));
  // }
  const removeFromCartfun = (id) => {
    dispatch(removeFromCart(id));
  
  };

  if (cart.cartItems.length == 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart__container">
      <div className="cart__box">
        <div className="cart__box__heading">
          <div className="product_box">Product</div>
          <div className="quentity">quantity</div>
          <div className="totalprice">Total</div>
        </div>

        {cart.cartItems.map((item) => {
          return (
            <div key={item?._id} className="product__containers">
              <div className="product__left">
                <img src={item?.image} alt="" />
                 <div className="ifo">
                 <p>{item?.name}</p>
                <p>price : ₹{item?.price}</p>
                 </div>
              </div>
              <div className="product__middle">
                <div className="add_to_cart_box">
                  <div className="input__box">
                    <button
                      onClick={() =>
                        Increment(item._id, item?.stock, item?.quantity)
                      }
                    >
                      +
                    </button>
                    <span className="cart__quantity">{item?.quantity}</span>
                    {/* <input className="input__tag" readOnly value={item?.quantity} type="number" /> */}
                    <button
                      onClick={() => Decrement(item?._id, item?.quantity)}
                    >
                    -
                    </button>
                  </div>
                  {/* <div className="addtocart__btn">
                        <button onClick={()=>AddtoCart(item?._id,item?.quantity)}>Add to cart</button>
                    </div> */}
                </div>
              </div>

              <div className="produect__right">
                <h5>Total price : ₹{item?.price * item?.quantity}</h5>

                <div className="removecart__btn">
                  <button onClick={() => removeFromCartfun(item._id)}>
                    Remove cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="total__price__box">
        <h3>
          Total ₹:
          {cart.cartItems.reduce((accc, cur) => {
            accc = accc + cur.price * cur.quantity;
            return accc;
          }, 0)}{" "}
          Rs
        </h3>
        <Link to="/shipping">
          <button className="total__price__box__btn">Checkout</button>
        </Link>
       
       
      </div>
      
    </div>
  );
};

export default Cart;
