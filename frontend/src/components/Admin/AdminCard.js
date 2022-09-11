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
import "./Dashboard.css"
import {EditUserRole, getAllUser,DeleteUserRole} from "../../actions/userAction"
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function AdminCard({users}) {

    const dispatch=useDispatch();

    const handleEdit=async(user)=>{

      await  dispatch(EditUserRole(user));
    
      dispatch(getAllUser());
       
    }

    const handleDelete=async(user)=>{
        await  dispatch(DeleteUserRole(user));
        alert("user deleted")
        dispatch(getAllUser());
    }
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="table__data" align="right">Id</TableCell>
            <TableCell className="table__data" align="right">Name</TableCell>
            <TableCell className="table__data" align="right">Email</TableCell>
            <TableCell className="table__data"  align="right">Role</TableCell>
            <TableCell className="table__data" align="right">Edit</TableCell>
            <TableCell className="table__data" align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users?.map((user) => (
              <TableRow
                key={user._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {/* <TableCell component="th" scope="row">
                  {user._id}
                </TableCell> */}
                <TableCell className="table__data" align="right"> {user._id}</TableCell>
                <TableCell className="table__data" align="right"> {user.name}</TableCell>
                <TableCell className="table__data" align="right"> {user.email}</TableCell>
                <select id="selectUser" defaultValue={user.role}>
                   <option  className="table__data" value="user">user</option>
                   <option  className="table__data"  value="admin">Admin</option>
                </select>
                <TableCell align="right">
               
                  <Button color="success" onClick={()=>handleEdit(user)} className="btn" variant="contained">
                   Edit
                  </Button>
              
                </TableCell>
                <TableCell align="right">
                  <Button  onClick={()=>handleDelete(user)} variant="outlined" color="error">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
