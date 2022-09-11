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
} from "../constants/productContents";
import axios from "axios";


//create new product 

export const createNewProductByAdmin= (name,description,category,stock,price,image) => async (dispatch) => {
  try {

     dispatch({
      type:NEW_PRODUCT_RQUEST
     })
    const options={
      headers:{
        "Content-Type":"application/json"
      }
    }

    console.log(name,description,category,stock,price,image)
    const { data } = await axios.post(`/api/v1/admin/product/new`,{

      name,description,category,stock,price,image
    },options);

    console.log("action data", data);


    dispatch({
      type:NEW_PRODUCT_SUCCESS,
      payload:data.product
     })


  } catch (error) {
    console.log("error",error.response.data.message);

    dispatch({
      type:NEW_PRODUCT_FAIL,
      payload:error.message
     })
  }
};






//delete product by admin

export const DeleteProductByAdmin = (product) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/v1/admin/product/${product._id}`);

    console.log("action data", data);
  } catch (error) {
    console.log(error);
  }
};

//get all product
export const MygetAllProducts = () => async (dispatch) => {
  dispatch({
    type: ALL_PRODUCT_RQUEST,
  });

  try {
    const { data } = await axios.get(`/api/v1/products`);
    // data.then((res)=> dispatch({
    //     type:ALL_PRODUCT_SUCCESS,
    //     payload:res.data,

    // }));
    console.log("action data", data);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//end
export const getAllProducts =
  (keyword = "", currentPage, price = [0, 50000], productCategory = "") =>
  async (dispatch) => {
    console.log("cur", currentPage);
    console.log("price", price[0], price[1]);
    dispatch({
      type: ALL_PRODUCT_RQUEST,
    });

    try {
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (productCategory) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${productCategory}`;
      }
      const { data } = await axios.get(link);
      // data.then((res)=> dispatch({
      //     type:ALL_PRODUCT_SUCCESS,
      //     payload:res.data,

      // }));
      console.log("action data", data);
      console.log("cur", currentPage);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllProductsByAdmin = () => async (dispatch) => {
  dispatch({
    type: ALL_PRODUCT_RQUEST,
  });

  try {
    let link = `/api/v1/admin/products`;

    const { data } = await axios.get(link);
    // data.then((res)=> dispatch({
    //     type:ALL_PRODUCT_SUCCESS,
    //     payload:res.data,

    // }));
    console.log("action data", data);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  dispatch({
    type: PRODUCT_RQUEST,
  });

  try {
    const res = await axios.get(`/api/v1/product/${id}`);
    // data.then((res)=> dispatch({
    //     type:ALL_PRODUCT_SUCCESS,
    //     payload:res.data,

    // }));
    console.log("data", res.data);

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: res.data.ProductData,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
