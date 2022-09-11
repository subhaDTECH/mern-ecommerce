import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import {
  LoadUser,
  LoginUser,
  RegisterUser,
  UpdateUser,
} from "../../actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../layout/Home/Loader";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  // const history=useHistory();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user);

  const { error, loading, isAuthentication, isupDate } = userData;

  const [name, setName] = useState(userData?.user?.name);
  const [email, setEmail] = useState(userData?.user?.email);
  const [image, setImage] = useState(userData?.user?.avatar?.url);
  console.log(userData.user.avatar.url)
  console.log(userData);

  useEffect(() => {
    if (error) {
      return dispatch({ type: "CLEAR_ERRORS" });
    }
    if (!isAuthentication) {
      navigate("/login");
    }
    if( isupDate){
      alert(isupDate);
      navigate("/account");
      setName("")
      setEmail("")
      setImage("")
      dispatch(LoadUser());

    }
  }, [dispatch, isAuthentication, isupDate]);


  const signupFormSubmit = (e) => {
    e.preventDefault();

    dispatch(UpdateUser(name, email, image));
  };

  const handelInput = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(event) {
        if(reader.readyState===2){
            setImage(reader.result)
        }
        
      };
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="form__container">
      <div className="loginsingup__box">
        <div className="signupForm   signupFormSshow ">
          <h3>Update Profile</h3>
          <form onSubmit={signupFormSubmit}>
            <div className="login_input">
              <input
                name="name"
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="login_input">
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                value={email}
                placeholder="Enter Your Email"
              />
            </div>

            <div className="login_input">

               {
                image && <img  width="100px" height="100px" src={image}></img>
               }
              <input type="file" onChange={handelInput} accept="image/*" />
            </div>

            <div className="login_input">
              <button type="submit" className="login__btnSubmit">
                update
              </button>
            </div>
          </form>

          <Link className="back__bbtn" to="/account">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
