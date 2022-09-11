import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router";
import { getProduct } from "../../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Carousel from "react-material-ui-carousel";
import { AddItemsToCart } from "../../../actions/cartAction";


import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const ProductDetail = ({}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = useSelector((state) => state.product.product);
  
  const distatch = useDispatch();

  useEffect(() => {
    if (id) {
      distatch(getProduct(id));
    }
  }, [distatch, id]);

  if (Object.keys(product).length === 0) {
    return <Loader />;
  }

  const Increment = () => {
    if (product.stock <= quantity) return;
    setQuantity(quantity + 1);
  };
  const Decrement = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const AddtoCart = () => {
    distatch(AddItemsToCart(id, quantity));
    alert("product added to cart")
  };

  return (
    <>
      <div className="productDetail_container">
        <div className="product__left">
          <Carousel>
            {product?.images?.map((image, index) => {
              return (
                <div key={index} className="img_box">
                  <img  src={image.url} alt="" />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="product__right">
          <h2>{product.name}</h2>
          <p>##{product._id}</p>
          <hr />
          <div className="rating_box">
           
            <p>{product.numOfReviews} (reviews)</p>
            <p>{product.ratings} (Rating)</p>
            <Stack spacing={1}>
           <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          
          </Stack>
            
            <hr />
          </div>
          <div className="price_box">
            <h1>Price : ₹{product.price}</h1>
          </div>
          <div className="add_to_cart_box">
            <div className="input__box">
              <button onClick={Increment}>+</button>
              <input readOnly={true} value={quantity} type="number" />
              <button onClick={Decrement}>-</button>
            </div>
            <div className="addtocart__btn">
              <button onClick={AddtoCart}>Add to cart</button>
            </div>
          </div>
          <div className="stock__status">
            <h3 style={{background: product.stock>1 ? "green":"red"}} >status : {product.stock>1 ?  "InStock":"OutStock"}</h3>
          </div>
          <div className="product__decs">
            <h4>Description :</h4>
            <p>{product.description}</p>
          </div>
          <div className="addtocart__btn">
            <button>submit review</button>
          </div>

          <div></div>
        </div>
      </div>
     
    </>
  );
};

export default ProductDetail;
