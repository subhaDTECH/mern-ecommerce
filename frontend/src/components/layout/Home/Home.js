import React, { useEffect } from "react";
import "./home.css";
import { CgMouse } from "react-icons/all";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../actions/productAction";
import { productsReducer } from "../../../reducers/productReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "./Loader";
import Hero1 from "../../../images/hero1.jpg";
import Hero2 from "../../../images/hero2.jpg";
import Hero5 from "../../../images/hero5.jpg";
import Hero4 from "../../../images/hero4.jpg";

import Hero6 from "../../../images/hero6.png";
import Hero7 from "../../../images/hero7.jpg";
import Hero9 from "../../../images/hero9.jpg";
import Hero10 from "../../../images/hero10.jpg";
// Import Swiper styles

import Carousel from "react-material-ui-carousel";
// import required modules
import { Navigation } from "swiper";
import DemoProduct from "./DemoProduct";

const product = {
  name: "iphone",
  _id: "123",
  images: [
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  ],
  desc: "this is a good product",
};
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  console.log(products);
  console.log(loading)

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return (<Loader/>);
  }
  return (
    <>
      <div className="hero__container">
        <div className="main_hero">
          <div className="container">
            <h2>New Fashion of India FashionIsta</h2>
            <p>
              Get the Best product from our store.
             
            </p>
          </div>
        </div>
      </div>

      <div className="product__container">
        <h3 className="heading_title">Awesome New Product</h3>

        <div className="products__box">
          {products?.map((product, index) => {
            return <DemoProduct key={index} product={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
