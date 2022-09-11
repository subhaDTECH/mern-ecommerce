import React, { useState } from "react";
import "./CreateProduct.css";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Input, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Loader from "../layout/Home/Loader";
import { createNewProductByAdmin } from "../../actions/productAction";
import {useDispatch} from "react-redux"
import { useNavigate,Link } from "react-router-dom";

const AdminCreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");

  const dispatch=useDispatch()

  const navigate=useNavigate();
  
 




  const handelfileInput=(e)=>{
    let file=e.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        if(reader.readyState===2){
            setImage(reader.result)
        }
        
      };
    
      
}

const createProductByAdmin=(e)=>{
     e.preventDefault();
     dispatch(createNewProductByAdmin(name,description,category,stock,price,image))
     alert("Product created")
     setName("");
     setdescription("");
     setcategory("");
     setStock(0);
     setPrice(0);
     setImage("");
     navigate('/admin/dashboard/products')

}


  return (
    <div className="main">
      <form action="" className="from__conatiner" autoCapitalize="off">
        <h3>Create Product</h3>
        <div>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <input
            name="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            type="text"
            placeholder="Enter product Description"
          />
        </div>
        <div>
          <input
            name="category"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            type="text"
            placeholder="Enter product Category"
          />
        </div>
        <div>
          <input
            name="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="Enter product Stock"
          />
        </div>
        <div>
          <input
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter product Price"
          />
        </div>

        <div>
        {
            image && <img width="100px" height="100px" src={image} alt="" />
        }
       
          <input
            name="image"
            onChange={handelfileInput}
            type="file"
            accept="image/*"
          />
        </div>
        <Button onClick={createProductByAdmin} className="btn" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AdminCreateProduct;
