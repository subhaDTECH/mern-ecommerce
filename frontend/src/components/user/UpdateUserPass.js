import React,{useState} from 'react'
import "./UpdatePass.css";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockIcon from '@material-ui/icons/Lock';
import {UpdateUserPassword, ClearError} from "../../actions/userAction";
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../layout/Home/Loader';
import { useNavigate } from 'react-router-dom';
import {UPDATE_PASSWORD_RESET} from "../../constants/userConstants"
 
const UpdateUserPass = () => {
    const navigate=useNavigate();
    const data =useSelector((state)=>state.user);
    console.log(data);
    const {loading,isAuthentication,isupDate,error}=data;
    const [oldpassword,setOldpassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmednewPassword,setConfirmnewPassword]=useState("");
    const dispatch=useDispatch();

    const UpdateFormSubmit=(e)=>{
        e.preventDefault();
        dispatch(UpdateUserPassword(oldpassword,newPassword,confirmednewPassword));

    }
     if(isupDate){
        navigate('/account');
       
     }
     if(error){
         alert(error.message);
         dispatch(ClearError());
     }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="update_pass__container">
              <div className="update__pass__form"> 
                      <h3 className="update__pass__text">Update Password</h3>
                  <form   onSubmit={UpdateFormSubmit}>

                  <div>
                  <PersonOutlineIcon className="update__PASS__Icon"/>
                  <input
                  onChange={(e)=>setOldpassword(e.target.value)}
                      name="oldpassword"
                      type="password" placeholder="Enter Your Old Pasword" />

                  </div>
                     <div>
                     <LockIcon/>
                     <input
                      onChange={(e)=>setNewPassword(e.target.value)}
                       name="newPassword"
                       type="password" placeholder="Enter Your New Pasword" />
                     </div>

                     <div>
                     <LockIcon />
                     <input 
                     onChange={(e)=>setConfirmnewPassword(e.target.value)}
                      name="confirmednewPassword"
                      type="password" placeholder="confirm Your  Pasword" />
                     </div>
                     

                      <button >
                          update
                      </button>
                  </form>


              </div>
            
        </div>
    )
}

export default UpdateUserPass


