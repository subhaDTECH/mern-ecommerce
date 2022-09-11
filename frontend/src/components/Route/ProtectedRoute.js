// import React,{Fragment} from 'react'
// import {Route,Navigate} from "react-router-dom"
// import {useSelector} from "react-redux"

// const ProtectedRoute = ({component:Component,...rest}) => {

//   const userData=useSelector((state)=>state.user);
//   const {error,loading,isAuthentication,user}=userData;
  
//     return (
//         <Fragment>


//         { !loading && <Route
//           {...rest}
//             render={(props)=>{

//                 if (isAuthentication === false) {
//               return <Navigate to="/login" />;
//             }
//              return (
//                  <Component  {...props} />
//              )
//          }} 


//          />

//         }
         
            
//         </Fragment>
//     )
// }

// export default ProtectedRoute



import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
    const userData=useSelector((state)=>state.user);
    const {error,loading,isAuthentication,user}=userData;

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthentication === false) {
              return <Navigate to="/login" />;
            }

            // if (isAdmin === true && user.role !== "admin") {
            //   return <Navigate to="/login" />;
            // }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
