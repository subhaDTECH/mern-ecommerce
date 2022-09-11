import React from 'react'
import "./Demoproduct.css"
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const firstExample = {
  size: 30,
  value: 4.5,
  edit: false
};
const DemoProduct = ({ product }) => {
  
  return (
    <>
    <Link className='link__tag' to= {`/product/${product._id}`}>
<figure className="snip1418"><img src={product.images[0].url} alt="sample85"/>
  <div className="add-to-cart"> <i className="ion-android-add"></i><span>Add to Cart</span></div>
  <figcaption>
    <h3>{product.name}</h3>
    <p>{product.description}.</p>
    <div className="price">
      <s>₹{product.price+500}</s>₹{product.price}
    </div>
    <ReactStars {...firstExample} />
  </figcaption><a href="#"></a>
</figure>
</Link>

   </>

  )
}

export default DemoProduct;