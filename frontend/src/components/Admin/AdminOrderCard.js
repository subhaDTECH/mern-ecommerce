import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom"
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import "./Dashboard.css";
import { useRef,useState ,useEffect} from "react";
import {
    getAllOrdersByAdmin,
    deleteOrderByAdmin,
    editStatusByAdmin
  } from "../../actions/paymentAction";

 
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {EditUserRole, getAllUser,DeleteUserRole} from "../../actions/userAction"
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function AdminOrderCard({AllOrders}) {

    const dispatch=useDispatch();
    const [status,setStatus]=useState("");
    const Statusref = useRef(null);

   
    const deleteOrderHandle=async(id)=>{

        try{
           await dispatch( deleteOrderByAdmin(id));

           alert("Order Deleted !")

        }catch(e){
            alert(e)
        }
        

    }
 const EditStatusOrderHandle=async(id)=>{
   await  dispatch(editStatusByAdmin(id,status));
     alert("status updated ! ")
    await  dispatch(getAllOrdersByAdmin());
 
 }  
 const handleStatus=(e)=>{
    setStatus(e.target.value)
 } 
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="table__data" align="right">#Order No</TableCell>
            <TableCell className="table__data" align="right">#OrderId</TableCell>
            <TableCell className="table__data" align="right">OrderStatus</TableCell>
            <TableCell className="table__data" align="right">Edit Status</TableCell>
            <TableCell className="table__data" align="right">PlaceAt</TableCell>
            <TableCell className="table__data"  align="right">UserID</TableCell>
            <TableCell className="table__data" align="right"> Total Amount</TableCell>
            
            <TableCell className="table__data" align="right">city</TableCell>
            <TableCell className="table__data" align="right">state</TableCell>
            <TableCell className="table__data" align="right">country</TableCell>
            <TableCell className="table__data" align="right">Phone no</TableCell>
            <TableCell className="table__data" align="right">Product ID/quantity </TableCell> 
            
            <TableCell className="table__data" align="right">Delete</TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
          {AllOrders &&
            AllOrders?.map((order,index) => (
              <TableRow
                key={order._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {user._id}
                </TableCell> */}
                <TableCell className="table__data" align="right"> {index}</TableCell>
                     
                <TableCell className="table__data" align="right"> {order._id}</TableCell>
                     
                <TableCell className="table__data" align="right">
                <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{order.orderStatus}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="status"
          onChange={handleStatus}
        >
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
        </Select>
      </FormControl>
    </Box>
                </TableCell>
                <TableCell className="table__data" align="right">
                    {order.OrderStatus}
                    
                </TableCell>
                     
                     
                <TableCell align="right">
                  <Button 
                  
                  onClick={()=>EditStatusOrderHandle(order._id)}
                   variant="outlined" color="success">
                 Edit 
                  </Button>
                </TableCell>
                <TableCell className="table__data" align="right"> {order.createdAt}</TableCell>
                <TableCell className="table__data" align="right"> {order.user}</TableCell>
                <TableCell className="table__data" align="right"> ₹{order.totalPrice}</TableCell>
               
                <TableCell className="table__data" align="right">  {order.shippingInfo.city}</TableCell>
                <TableCell className="table__data" align="right"> {order.shippingInfo.state}</TableCell>
                <TableCell className="table__data" align="right">  {order.shippingInfo.country}</TableCell>
                <TableCell className="table__data" align="right">  {order.shippingInfo.phoneNo}</TableCell>
                
               
                 {
                    order?.orderItems?.map((i)=>{
                        return (
                            
                           
                            <>
                            <div>
                            <TableCell className="table__data" align="right">  {i._id}</TableCell>
                            <TableCell className="table__data" align="right">  {i.quantity}</TableCell>
                            
                            </div>
                           
                            </>
                        )
                    })
                 }
                  
              
                <TableCell align="right">
                <TableCell align="right">
                  <Button 
                  
                  onClick={()=>deleteOrderHandle(order._id)}
                   variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
