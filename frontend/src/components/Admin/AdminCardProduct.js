import * as React from "react";
import {useEffect} from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import { getAllProductsByAdmin,DeleteProductByAdmin } from "../../actions/productAction";
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function AdminCardProduct({products}) {

console.log(products)
const dispatch=useDispatch();

const handleDelete=async(product)=>{
        await dispatch(DeleteProductByAdmin(product));
        alert("product deleted")
        dispatch(getAllProductsByAdmin());
      
}

useEffect(()=>{
    dispatch(getAllProductsByAdmin());
},[dispatch])
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table__data" align="right">Id</TableCell>
            <TableCell className="table__data" align="right">Title</TableCell>
            <TableCell className="table__data" align="right">Description</TableCell>
            <TableCell className="table__data" align="right">Price</TableCell>
            <TableCell className="table__data" align="right">Stock</TableCell>
            <TableCell className="table__data" align="right">Image</TableCell>
            <TableCell className="table__data" align="right">Edit</TableCell>
            <TableCell className="table__data" align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products?.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product._id}
                </TableCell>
                <TableCell className="table__data" align="right"> {product.name}</TableCell>
                <TableCell className="table__data" align="right"> {product.description}</TableCell>
                <TableCell className="table__data" align="right"> {product.price}</TableCell>
               
                <TableCell className="table__data" align="right"> {product.stock}</TableCell>
                <TableCell className="table__data" align="right"> 
                  <img width="100px" height="100px" src={product.images[0].url} alt="" />
                </TableCell>
               
               
                <TableCell align="right">
                  <Button variant="contained" color="success">
                Edit
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button onClick={()=>handleDelete(product)} variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
