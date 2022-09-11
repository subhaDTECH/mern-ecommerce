import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";

import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { useHistory } from "react-router-dom";
// import { useAlert } from "react-alert";
// import { LogoutUser } from "../../../actions/userAction";
import {LogoutUser} from "../../../actions/userAction"
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"


const UserOptions = ({ user }) => {
  // const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const navigate=useNavigate();
  // const history = useHistory();
  // const alert = useAlert();
  const dispatch = useDispatch();

  const options = [
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    
    { icon: <RemoveShoppingCartIcon />, name: "Cart", func: cartfun },
    
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUserfun },
  ];

  //if admin than add dashboared in array
  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function cartfun() {
    navigate("/cart");
  }

  function orders() {
    navigate("/me/orders");
  }
  function account() {
    navigate("/account");
  }
  // function cart() {
  //   history.push("/cart");
  // }
  function logoutUserfun() {
    dispatch(LogoutUser());
    alert("Logout Successfully");
   
  }

  return (
    <Fragment>
       {/* this is the dark layer  */}
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user?.avatar?.url}
            // src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            style={{fontSize:"1200px"}}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;