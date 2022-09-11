import React,{useState} from 'react'
import "./ResetPasswordEmail.css";
import EmailIcon from '@material-ui/icons/Email';
import { useDispatch,useSelector } from 'react-redux';
import {forgotPassword} from "../../actions/userAction"
import Loader from '../layout/Home/Loader';

const ResetPasswordEmail = () => {
    const [email,setEmail]=useState("");
    const dispatch=useDispatch();
    const data=useSelector((state)=>state.forgotPass);
    const {error,loading,message}=data;
    console.log(data);
    const sendEmail=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword(email));
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="reset__password__container">
             <div className="center__box">
                   <form onSubmit={sendEmail}>
                          <h3>Verify your Email</h3>
                       <div className="email__box">
                        <EmailIcon/>
                         <input 
                         name="email"
                         onChange={(e)=>setEmail(e.target.value)}
                         type="email" placeholder="Please Enter Your Email.." />
                       </div>
                       <button>
                           Reset password
                       </button>
                   </form>

             </div>
            
        </div>
    )
}

export default ResetPasswordEmail
