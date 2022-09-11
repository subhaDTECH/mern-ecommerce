import axios from "axios"
import {
    //login
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,

    //register
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    //loaduser
    LOADUSER_REQUEST,
    LOADUSER_SUCCESS,
    LOADUSER_FAIL,

    //LOGOUT
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    //update password
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,

    //forgot passsword
    FROGOT_PASSWORD_REQUEST,
    FROGOT_PASSWORD_SUCCESS,
    FROGOT_PASSWORD_FAIL,

    //reset pasword
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,


    //updateuer

    USERUPDATE_REQUEST,
    USERUPDATE_SUCCESS,
    USERUPDATE_FAIL,


    //get all user 

    ALLUSER_REQUEST,
    ALLUSER_SUCCESS,
    ALLUSER_FAIL,

    //edit user role 
    EDITUSER_ROLE_REQUEST,
    EDITUSER_ROLE_SUCCESS,
    EDITUSER_ROLE_FAIL



   

} from "../constants/userConstants.js"

//get all user by admin 


//detele user by admin 

//handleDelete



export const  DeleteUserRole=(user)=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
       


        const {data}=await axios.delete(`/api/v1/admin/user/${user._id}`);


        console.log("data",data);
       
        dispatch({type:   EDITUSER_ROLE_SUCCESS,payload:data.message});


       

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error)
        dispatch({
            type:  EDITUSER_ROLE_FAIL,
            payload:error,
 
        });
        
    }
     
   

}


//edit user role 

export const  EditUserRole=(user)=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
        dispatch({type:   EDITUSER_ROLE_REQUEST});


        const {data}=await axios.put(`/api/v1/admin/user/${user._id}`,{
            user
        },config);


        console.log("data",data);
       
        dispatch({type:   EDITUSER_ROLE_SUCCESS,payload:data.message});


       

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error)
        dispatch({
            type:  EDITUSER_ROLE_FAIL,
            payload:error,
 
        });
        
    }
     
   

}





export const  getAllUser=()=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
        dispatch({type:  ALLUSER_REQUEST});


        const {data}=await axios.get('/api/v1/admin/users');


        console.log("data",data);
       
        dispatch({type:   ALLUSER_SUCCESS,payload:data.users});


       

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error)
        dispatch({
            type: ALLUSER_FAIL,
            payload:error,
 
        });
        
    }
     
   

}

//update user 

export const  UpdateUser=(name,email,image)=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
        dispatch({type: USERUPDATE_REQUEST});


        const {data}=await axios.put('/api/v1/me/update',
        {name,email,image},config);


        console.log("data",data);
       
        dispatch({type:  USERUPDATE_SUCCESS,payload:data.message});


       

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error.response.data.message)
        dispatch({
            type: USERUPDATE_FAIL,
            payload:error,
 
        });
        
    }
     
   

}



//reset password 
export const ResetUserPassword=(token,password,confirmedPassword)=>async(dispatch)=>{

try{
    dispatch({type: RESET_PASSWORD_REQUEST});
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const data=await axios.put(`/api/v1/password/reset/${token}`,
 {password,confirmedPassword}, config);

    dispatch({type: RESET_PASSWORD_SUCCESS,payload:data});

}catch(error){
    console.log(error)
    console.log(error.response.data.message)
    dispatch({
        type: RESET_PASSWORD_FAIL,
        payload:error,

    });

}
}


//send email for password reset

export const forgotPassword=(email)=>async(dispatch)=>{

    try{
        dispatch({type: FROGOT_PASSWORD_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const data=await axios.post('/api/v1/password/forgot',
     {email}, config);

        dispatch({type:FROGOT_PASSWORD_SUCCESS,payload:data});

    }catch(error){
        console.log(error)
        console.log(error.response.data.message)
        dispatch({
            type:FROGOT_PASSWORD_FAIL,
            payload:error,
 
        });

    }
}




//clear errors
export const ClearError=()=>async(dispatch)=>{

   
    dispatch({type:CLEAR_ERRORS});
     
   

}


//LOGIN
export const LoginUser=(email,password)=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
        dispatch({type:LOGIN_REQUEST});


        const {data}=await axios.post('/api/v1/login',
        {email,password},config);


        console.log("data",data);
       
        dispatch({type:LOGIN_SUCCESS,payload:data.user});

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error.response.data.message)
        dispatch({
            type: LOGIN_FAIL,
            payload:error,
 
        });
        
    }
     
   

}


//register
export const RegisterUser=(name,email,password,image)=>async(dispatch)=>{

    try{
        const config={
            headers:{
                "Conatent-Type":"application/json"
            }
        }
        dispatch({type: REGISTER_REQUEST});


        const {data}=await axios.post('/api/v1/register',
        {name,email,password,image},config);


        console.log("data",data);
       
        dispatch({type: REGISTER_SUCCESS,payload:data.user});


        dispatch({type: REGISTER_SUCCESS,payload:data.user});

       
    
       
    

    }catch(error){
        console.log(error)
        console.log(error.response.data.message)
        dispatch({
            type: REGISTER_FAIL,
            payload:error,
 
        });
        
    }
     
   

}

//LOADUSER
export const LoadUser=()=>async(dispatch)=>{

    try{
       
        dispatch({type: LOADUSER_REQUEST});


        const {data}=await axios.get('/api/v1/me');


        console.log("data",data);
       
        dispatch({type:  LOADUSER_SUCCESS,payload:data.user});

       
    
       
    

    }catch(error){
        console.log("err",error)
        console.log(error.response.data.message)
        dispatch({
            type: LOADUSER_FAIL,
            payload:error,
 
        });
        
    }
     
   

}

//LOGOUT
export const LogoutUser=()=>async(dispatch)=>{
     try{
         dispatch({type: LOGOUT_REQUEST});

         await axios.post('/api/v1/logout');
         

         dispatch({type: LOGOUT_SUCCESS});

     }catch(error){

        console.log("err",error)
        console.log(error)
        dispatch({
            type: LOGOUT_FAIL,
            payload:error,
 
        });


     }
   

}

//update password

export const UpdateUserPassword=(oldpassword,newPassword,confirmednewPassword)=>async(dispatch)=>{

     try{
         const config={
             headers:{
                 "Content-Type":"application/json"
             }
         }
         dispatch({type: UPDATE_PASSWORD_REQUEST});
         const {data}=await axios.put("/api/v1/password/update",{
            oldpassword,
            newPassword,
            confirmednewPassword

         },config);

         dispatch({type:  UPDATE_PASSWORD_SUCCESS,payload:data});

        //  dispatch({type:UPDATE_PASSWORD_RESET});


     }catch(error){
        console.log("err",error)
        console.log(error)
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error,
 
        });

     }
}