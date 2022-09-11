import React ,{useState,useEffect}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllProducts } from '../../../actions/productAction'
import ProductDiv from "./ProductDiv.js"
import Loader from './Loader';
import "./ProductList.css"


const ProductList = ({match}) => {
    const {keyword}=useParams()
    const dispatch=useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    console.log( "product",products)
   

    useEffect(()=>{
        dispatch(getAllProducts(keyword));

    },[dispatch,keyword]);
    if(loading){
        return (<Loader/>)
    }

  return (
    <div className='product__list__container'>
      <h3>Product</h3>
       
         <div className='right__side__bar'>
       
               {
                   products?.length!==0 ? (products.map((product,index)=>{
                       return (
                           <ProductDiv key={index} product={product}/>
                       )
                   }))
                   :(<h1 className='notfount__text'>not found</h1>)
               }
         </div>

    </div>
  )
}

export default ProductList