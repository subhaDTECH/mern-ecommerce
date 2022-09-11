import React,{useState,useEffect} from 'react';
import "./LoginSignup.css"
import {LoginUser,RegisterUser} from "../../actions/userAction.js"
import {useDispatch,useSelector} from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import Loader from '../layout/Home/Loader';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';


const LoginSignup = () => {

    const dispatch=useDispatch();
    // const history=useHistory();
    const navigate = useNavigate();
   
    const userData=useSelector((state)=>state.user);
   
    //true
    const [show,setShow]=useState(false);
    const [signUp,setSignup]=useState(false);

    const {error,loading,isAuthentication}=userData;
     console.log(userData)


     useEffect(()=>{

        if(error){
            dispatch({type:"CLEAR_ERRORS"});
        }

        if(isAuthentication){
            navigate('/account');
        }

     },[dispatch,isAuthentication])



    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    })
    const [image,setImage]=useState(null)
    const formLogin=()=>{
           setShow(false);
           setSignup(false);
    }
    const fromsignup=()=>{
        setShow(true);
        setSignup(true);

    }
    const handelInput=(e)=>{
      
        setUser({...user,[e.target.name]:e.target.value})

    }
    const loginFormSubmit=(e)=>{
        e.preventDefault();
     
        dispatch(LoginUser(user.email,user.password));

    }
    const signupFormSubmit=(e)=>{
        e.preventDefault();
      
        dispatch(RegisterUser(user.name,user.email,user.password,image));


    }

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

    if(loading){
        return  <Loader/>
    }
    return (
        <div className="form__container">
             <div className="loginsingup__box">
                   <div className="btn__box">
                        <button onClick={()=>formLogin()} className="login__btn">Login</button>
                        <button onClick={()=>fromsignup()} className={`register__btn ${signUp && "login__btn"}`}>Register</button>
                   </div>
                   <div className={`loginForm  ${show && "login_hidden"  } `} >
                        <form onSubmit={loginFormSubmit}>
                        <div className="login_input">
                     
                            <input 
                            name="email"
                            onChange={handelInput}
                            type="text" placeholder="Enter Your Email" />
                        </div>
                        <div className="login_input">
                            <input 
                            name="password"
                             onChange={handelInput}
                            type="text" placeholder="Enter Your password" />
                        </div>
                        


                           <Link to="/password/forgot">
                           <p className="forgot_text">Forgot Your Password ?</p>
                           </Link>
                            <div className="login_input">
                                <button type="submit" className="login__btnSubmit">Login</button>
                            </div>

                        </form>
                  
                      

                   </div>

                   {/* // */}

                   <div className={`signupForm  ${ signUp && "signupFormSshow   "  }`}>
                      
                        <form onSubmit={signupFormSubmit}>
                        <div className="login_input">
                            <input
                             name="name"
                              onChange={handelInput}
                             type="text" placeholder="Enter Your Name" />
                        </div>
                        <div className="login_input">
                            <input 
                            name="email"
                             onChange={handelInput}
                            type="text" placeholder="Enter Your Email" />
                        </div>
                        <div className="login_input">
                            <input
                            name="password" 
                              onChange={handelInput}
                            type="text" placeholder="Enter Your password" />
                        </div>
                        <div className="login_input">
                            <input 
                             name="image"
                             onChange={handelfileInput}
                             type="file"
                             accept='image/*'
                             
                             
                              />
                        </div>
                           
                           
                            <div className="login_input">
                                <button type="submit" className="login__btnSubmit">register</button>
                            </div>

                        </form>
                  
                      

                   </div>


                   {/* end  */}
                   

             </div>
            
        </div>
    )
}

export default LoginSignup
