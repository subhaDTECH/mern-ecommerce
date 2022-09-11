const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
const IsLogin=async(req,res,next)=>{

    try{
        const token=req.cookies.token;
        console.log(token)
       const tokenverify=await jwt.verify(token,process.env.JWT_SCERET_KEY);
        if(!tokenverify){
            return res.status(500).json({
                success:false,
                error:'Token not provide'
    
            })
        }
        console.log(tokenverify)
        const user=await User.findById(tokenverify.id);
        //user
        console.log(user);
        req.user=user;
        next();
        

    }catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:" YOU need to Login first",
            error:e

        })
    }
     
}


//isAdmin check
const IsAdmin = (...roles) => {
    //convert the coming data to a array
    console.log(roles)
    return (req, res, next) => {
        //ata amon chilo 
        // !roles.includes(req.user.role
      if (!roles.includes(req.user.role)) {
        return res.status(500).json({
            success:false,
            message:"you are not authrorised"
        })
      }
  
      next();
    };
  };



module.exports={IsLogin,IsAdmin};