import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
// sx={{ maxWidth: 200 }}
const Product = ({ product }) => {
    console.log(product)
  return (
    <Link to={`/product/${product._id}`} className="card__product">
      <Card >
      <CardMedia
        component="img"
        height="240"
        image={product.images[0].url}
        alt="green iguana"
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           Title : {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Desc:  {product.description}
          </Typography>
           <Typography >
          Price :  <span className="price__tag">₹{product.price}</span>
           </Typography>
           <Typography>
          Rating : {product.ratings}
          <Rating className="rating" name="half-rating" defaultValue={2.5} precision={0.5} />
           </Typography>

        </CardContent>
      </Card>
    </Link>
  );
};

export default Product;
