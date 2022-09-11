import React,{useState} from 'react';
import "./UpdatePass.css";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LockIcon from '@material-ui/icons/Lock';
import {UpdateUserPassword, ClearError,ResetUserPassword} from "../../actions/userAction";
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../layout/Home/Loader';
import { useNavigate,useParams } from 'react-router-dom';
import {UPDATE_PASSWORD_RESET} from "../../constants/userConstants";
 
const ResetPassword = () => {
    const navigate=useNavigate();
    const {token}=useParams();
    const data =useSelector((state)=>state.user);
    console.log(data);
    const {loading,error,user}=data;
  
    const [password,setNewPassword]=useState("");
    const [confirmedPassword,setConfirmnewPassword]=useState("");
    const dispatch=useDispatch();

    const UpdateFormSubmit=(e)=>{
        e.preventDefault();
        dispatch(ResetUserPassword(token,password,confirmedPassword));

    }
    if(user){
        navigate('/login');
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
                     <LockIcon/>
                     <input
                      onChange={(e)=>setNewPassword(e.target.value)}
                       name="password"
                       type="password" placeholder="Enter Your New Pasword" />
                     </div>

                     <div>
                     <LockIcon/>
                     <input 
                     onChange={(e)=>setConfirmnewPassword(e.target.value)}
                      name="confirmedPassword"
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

export default ResetPassword;



