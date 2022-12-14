const ErrorHander=require('../utils/errorHander')

module.exports=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

  next(res.status(err.statusCode).json({
    success: false,
    message: err.message,
  }));  
}