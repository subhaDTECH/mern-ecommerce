const User=require('../models/userModel')
const bcrypt=require("bcryptjs")
const sendToken=require('../utils/jwtToken')
const sendEmail=require("../utils/sendEmail")
const Crypto=require('crypto')
const { findByIdAndUpdate } = require('../models/userModel')
const cloudinary = require('cloudinary').v2;

//register route
exports.registerUser=async(req,res)=>{

    try{
        const {name,email,password,image}=req.body;

        //post on cloudanary
        const result = await cloudinary.uploader.upload(image,{
            floder:"UserAvatar"
        });
        console.log(result)
        const user=await User.create({
            name,
            email,
            password,
            avatar:{
                  public_id:result.public_id,
                  url:result.secure_url
            }
        });

        const saveuser=await user.save();
        console.log("save user",saveuser)
        //create token
        sendToken(user,200,res);


    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            error:e.message
        })
    }

}

//login route

exports.loginUser=async(req,res)=>{

    try{
        const {email,password}=req.body;
        if(!email ||!password){
            return res.status(500).json({error:"ALL field require"});
        }
        const finduser=await User.findOne({email:email}).select("+password");
        if(!finduser){
            return res.status(500).json({error:"User not found"});
        }
        console.log(finduser)
        const isMatch=await  bcrypt.compare(password,finduser.password)
        console.log(isMatch)
        if(!isMatch){
            return res.status(500).json({error:"Invalid email or password"});
        }

        //caall sendToken function 
        sendToken(finduser,200,res);

        // const token=await finduser.getJWTToken();
        // res.status(200).json({
        //     success:true,
        //     message:" USER LOGIN SUCCESSFULLLY",
        //     token

        // })


    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            error:e.message
        })
    }

}

//user logout 

exports.UserLogout=async(req,res)=>{

    try{
        res.cookie('token',null,{
            exprires:new Date(Date.now())
        })
        res.status(200).json({
            success:true,
            message:"user logout successfully"
        })

    }catch(e){
        res.status(500).json({
            success:false,
            message:e
        })

    }

}



//forgout password 

exports.forgotPassword=async(req,res,next)=>{


    try{
      const user=await User.findOne({email:req.body.email}).select("+password");
      console.log("user",user);
      if(!user){
          return res.status(500).json({
              success:false,
              message:"user not found"
          });

      }
      //create token function
      const refreashToken= await user.getPasswordToken();

      //save the user

      await user.save({validateBeforeSave:false})

//create url
     const resetpasswordURL=`${req.protocol}://${req.get("host")}/password/reset/${refreashToken}`;

  //create message 
  const message=`your reset password link is  ${resetpasswordURL} \n\n 
  
  \n\n
  If you have not request to this email
  then, ignore this link`;  

  //send mail with reset url
  
  await sendEmail({
      email:user.email,
      subject: "Ecommerce web password recovery",
      message:message
  })
   console.log("mail send ")
  //send response
  res.status(200).json({
    success:true,
    message:'mail send successfully',
  

})
next();



     
    }catch(e){
        console.log(e);
        this.resetPasswordToken=undefined;
        this.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        next();
    }

}




//________________reset password-----------

exports.resetPassword=async(req,res,next)=>{

    const resetPasswordToken=  Crypto.createHash("sha256")
    .update(req.params.token).digest("hex");
    console.log("token -->",req.params.token)

    console.log(resetPasswordToken);
   
    //find the reset  token 
  const user=await User.findOne({
        resetPasswordToken:resetPasswordToken,
        // resetPasswordExpire:{$gt:Date.now()}


    
    });
    console.log("user reset password",user)
    if(!user){
        return next(res.status(400).json({success:false,message:"Reset password token Ivalid or expire"}))
    }

    if(req.body.password!==req.body.confirmedPassword){
       return next(res.status(400).json({success:false,message:"your password dose not match "}))
    }

    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
   

    //save user
    await user.save();



    //now give token to user to login
    next(sendToken(user,200,res));
    


    }


    //get user details
exports.getUserDetails=async(req,res,next)=>{

       const user=await User.findById(req.user.id);
       if(!user){
          return next(res.status(400).json({success:false,message:"user not found"}))
       }
       res.status(200).json({
           success:true,
           user
       })

    }


 //____----------update password--------
 
 exports.updatePasword=async(req,res,next)=>{
   const {oldpassword}=req.body;
   const user=await  User.findById(req.user.id).select("+password");
   const isMatch=await  bcrypt.compare(oldpassword,user.password);
   console.log(isMatch)
   if(!isMatch){
       return res.status(500).json({error:"Invalid password"});
   }

  if(req.body.newPassword!==req.body.confirmednewPassword){
    return res.status(400).json({success:false,message:"Your password not match"})
  }
  req.user.password=req.body.newPassword;


  await req.user.save();


  sendToken(user,200,res);
    

 }




 //profile update 



 exports.updateProfile=async(req,res)=>{
   
    const {name,email,image}=req.body;


    if(!name || !email || !image){
        return res.status(400).json({
            success:false,
            message:"required all the filed"
          })
    }

      const userExist=await User.findById({_id:req.user.id});
      if(!userExist){
          return res.status(400).json({
            success:false,
            message:"uer not found"
          })
      }

    //destory previuos image 

     //post on cloudanary
     await cloudinary.uploader.destroy(userExist.avatar.public_id);


     //new post 
     const result = await cloudinary.uploader.upload(image,{
        floder:"UserAvatar"
    });

    //new data 

    const options={
        name,
        email,
       
        avatar:{
              public_id:result.public_id,
              url:result.secure_url
        }
    }

    const user=await User.findByIdAndUpdate(req.user.id,options,{
        new:true,
        runValidators:true,
        
    });

    res.status(200).json({
        success:true,
        message:"User profile update successfully"
    });

 }





 //********************admin routes******************** */
//get all user  by admin
 exports.getAlluserBYAdmin=async(req,res)=>{


    try{

        const users=await User.find();
        console.log(users)
        if(!users){
            return res.status(400).json({
                sucess:false,
                message:"User not found"
            })
        }
    
        res.status(200).json({
            sucess:true,
            users
        })

    }catch(e){
        return res.status(400).json({
            sucess:false,
            message:e
        })
    }
   
 }

//get one user by admin
 exports.getOneUserByAdmin=async(req,res)=>{

    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(400).json({
            sucess:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        sucess:true,
        user
    })

 }


//update user by admin
 exports.updateProfileByAdmin=async(req,res)=>{
    const {user}=req.body;
    console.log(user)
    let updateRole;
    if(user.role==="admin")updateRole="user";
    else updateRole="admin";

    const userdata=await User.findByIdAndUpdate(req.params.id,{
        role: updateRole
    },{
        new:true,
        runValidators:true,
        
    });

    if(!user){
        return res.status(400).json({
            sucess:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"User profile update successfully",
        user
    });

 }


 //delete user by admin
 exports.DeleteOneUserByAdmin=async(req,res)=>{

    const user=await User.findByIdAndDelete(req.params.id);

    if(!user){
        return res.status(400).json({
            sucess:false,
            message:"User not found"
        })
    }

    res.status(200).json({
        success:true,
        message:"User  Delete successfully"
    });
 }



 