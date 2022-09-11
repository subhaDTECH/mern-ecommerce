import React,{useEffect} from 'react'
import "./ProfileUser.css";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate ,Link} from 'react-router-dom';

const ProfileUser = () => {
    const userData=useSelector((state)=>state.user);
  const {error,loading,isAuthentication,user}=userData;
  const navigate=useNavigate();
  useEffect(()=>{
       if(!isAuthentication){
         
         navigate('/login');
       }
  },[isAuthentication]);
    return (
        <div className="profile__container">
            <div className="profile__left__side">
                 <img src={user?.avatar?.url} alt="" /> 
                 <Link className="edit__btn" to="/me/update">
                  <button className='edit__btn2'>Edit Profile</button>
                </Link>

            </div>
             
             <div className="profile__right__side">
               <div className="name__box">
                   <h3>Full Name</h3>
                     <p>{user?.name}</p>
                      <hr />
               </div>
               <div className="Email__box">
                   <h3>Email</h3>
                     <p>{user?.email}</p>
                     <hr />
               </div>
               <div className="joined__box">
                   <h3>Joined On</h3>
                    <p>{user?.createdAt?.substr(0,10)}</p>
               </div>
               <div className="cahnge__btn__box">
                <Link className="edit__btn" to="/password/update">
                  <button className='edit__btn2'>change password</button>
                </Link>
                <Link className="edit__btn" to="/me/orders">
                  <button className='edit__btn2'>My Orders</button>
                </Link>

                 
               </div>

             </div>
            
        </div>
    )
}

export default ProfileUser
