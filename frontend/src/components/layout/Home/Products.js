import React, { useEffect, useState } from "react";
import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../actions/productAction";
import { productsReducer } from "../../../reducers/productReducer";
import "./home.css";
import Pagination from "react-js-pagination";
import ProductDiv from "./ProductDiv";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import Loader from "./Loader";
import { Typography } from "@mui/material";
import ProductSlider from "./ProductSlider";
function valuetext(value) {
  return `${value}°C`;
}

const categories = [
  {
    id: 1,
    category: "Fashion&Men",
  },
  {
    id: 2,
    category: "mobile",
  },
  {
    id: 3,
    category: "Laptop",
  },
  {
    id: 4,
    category: "Fashion&Women",
  },
  {
    id: 5,
    category: "Tv",
  },
  {
    id: 6,
    category: "Medical&Helath",
  },
  {
    id: 7,
    category: "Electronics",
  },
  {
    id: 8,
    category: "Sports",
  },
  {
    id: 9,
    category: "Toy&children",
  },
];
const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const [productCategory, setProductCategory] = useState("");

  const { loading, error, products, productsCount, resultPerpage } =
    useSelector((state) => state.products);
  console.log(products);
  console.log("products page", products);
  console.log("current page", currentPage);
  let keyword = "";
  useEffect(() => {
    dispatch(getAllProducts(keyword, currentPage, price, productCategory));
  }, [dispatch, currentPage, price, productCategory]);
  
  if (loading) {
    return <Loader />;
  }
  const changePageNo = (e) => {
    setCurrentPage(e);
  };
  const handleChange = (event, newValue) => {
   
    setPrice(newValue);
  };

  return (
    <div className="products">
      <div className="product__container">
        <h3>New Collections</h3>
        <div className="range__list">
          <Typography className="filter_text">Filter By Price</Typography>
          0
          <Slider
            className="slider__range"
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={50000}
          />
          50000
        </div>
        <div className="silderbox">
          <div className="cat__list">
            {categories.map((cat, index) => {
              return (
                <p
                  key={index}
                  onClick={() => setProductCategory(cat.category)}
                  className="category_list"
                 
                >
                  {cat.category}
                </p>
              );
            })}
          </div>
        </div>

        <div className="products__box">
          {products && products.length === 0 ? (
            <Typography>No Product ! </Typography>
          ) : (
            products?.map((product, index) => {
              return <ProductDiv key={index} product={product} />;
            })
          )}
        </div>
        <div className="pagination">
          {products?.length > 0 && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerpage}
              totalItemsCount={productsCount}
              onChange={changePageNo}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="1st"
              lastPageText="Last"
              nextPageText="next"
              prevPageText="prev"
              activeClass="activePageclass"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

//https://internfreak.co/jobs-and-internship-opportunities/2023-technology-full-time-analyst-program-or-morgan-stanley
