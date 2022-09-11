import React, { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminCard from "./AdminCard";
import { getAllUser } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  getAllProducts,
  getAllProductsByAdmin,
} from "../../actions/productAction";
import Loader from "../layout/Home/Loader";
import { Link } from "react-router-dom";
import { getAllOrdersByAdmin } from "../../actions/paymentAction";
const DashboardUserPage = () => {
  const userData = useSelector((state) => state.user);
  const { error, loading, isAuthentication, user, users } = userData;

  const { products } = useSelector((state) => state.products);
  console.log(products, "pro--->");
  console.log(users);
  console.log(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
    if (user.role === "user") {
      navigate("/account");
    }
  }, [navigate, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="dashboard__conatiner">
      <div className="main__div">
        <div className="box">
          <div className="left__box">
            <div className="left__box__header">
              <h3>DashBoard/Users</h3>
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
            <AdminCard users={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUserPage;
