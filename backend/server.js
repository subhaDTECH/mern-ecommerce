const app=require("./app")
const Razorpay = require('razorpay'); 
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }




const port=process.env.PORT ;
require('./db/conn')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: process.env.Razorpay_KEY_ID,
  
    // Replace with your key_secret
    key_secret: process.env.Razorpay_KEY_SECRET
});







//listen port

app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})





