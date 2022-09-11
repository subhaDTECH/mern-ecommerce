//create token and store in cookie and return 

const sendToken=async(user,statuscode,res)=>{
    const token= await user.getJWTToken();

    //store token in cookie
    //  Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    res.cookie('token',token,{
        expires:new Date(Date.now()+300000000),
        httpOnly:true
    });

    res.status(statuscode).json({
        success:true,
        user,
        token
    })

}

module.exports=sendToken;