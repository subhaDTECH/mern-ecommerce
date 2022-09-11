import React from 'react'
// import './ProductDiv.css'
import "./Demoproduct.css"
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactStars from "react-rating-stars-component";
const firstExample = {
  size: 30,
  value: 4.5,
  edit: false
};
const ProductDiv = ({product}) => {
    
  return (
    <>
       {/* <Link to={`/product/${product._id}`} className="card__product">
      <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.images[0].url}
        alt="product image"
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Title : {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Desc:  {product.description}
          </Typography>
           <Typography>
          Price :  ₹{product.price}
           </Typography>
           <Typography>
          Rating  {product.ratings}
           </Typography>

        </CardContent>
      </Card>
    </Link> */}

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
  </figcaption>
</figure>
</Link>
    </>
  )
}

export default ProductDiv;