import React, { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminOrderCard from "./AdminOrderCard"
import { getAllUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  getAllProducts,
  getAllProductsByAdmin,
} from "../../actions/productAction";

import {
    getAllOrdersByAdmin,
    deleteOrderByAdmin
  } from "../../actions/paymentAction";
import Loader from "../layout/Home/Loader";
import { Link } from "react-router-dom";


const DashboardProductPage = () => {
  const userData = useSelector((state) => state.user);
  const {AllOrders,loading} = useSelector((state) => state.AllOrders);
  const { error,  isAuthentication,   user, users } = userData;

  console.log(AllOrders,"allorders")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    if (user.role === "user") {
      navigate("/account");
    }
  }, [navigate, dispatch]);

  if (loading ) {
    return <Loader />;
  }

  return (
    <div className="dashboard__conatiner">
      <div className="main__div">
        <div className="box">
          <div className="left__box">
            <div className="left__box__header">
              <h3>DashBoard/Orders</h3>
            </div>
            <nav className="nav__left">
              <ul className="left__box__ul">
                <Link className="link__btn" to="/admin/dashboard/users">
                  <Button
                    className="btn"
                    onClick={() => dispatch(getAllUser())}
                    variant="contained"
                  >
                    Users
                  </Button>
                </Link>
                <Link className="link__btn" to="/admin/dashboard/products">
                  <Button
                    className="btn"
                    onClick={() => dispatch(getAllProductsByAdmin())}
                    variant="contained"
                  >
                    Products
                  </Button>
                </Link>
                <Link className="link__btn" to="/admin/dashboard/orders">
                  <Button
                    onClick={() => dispatch(getAllOrdersByAdmin())}
                   className="btn" variant="contained">
                    Orders
                  </Button>
                </Link>
              </ul>
            </nav>
          </div>
          <div className="right__box">
             <AdminOrderCard  AllOrders={AllOrders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductPage;
