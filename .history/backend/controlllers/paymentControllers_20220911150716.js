// This razorpayInstance will be used to
const Razorpay = require('razorpay');
const crypto=require("crypto") 
const Order=require("../models/orderModel")
// access any resource from razorpay
const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: process.env.Razorpay_KEY_ID,
  
    // Replace with your key_secret
    key_secret: process.env.Razorpay_KEY_SECRET
});


//create payment 
exports.checkout=async(req, res)=>{ 


    try{

         // STEP 1:
    const {amount}  = req.body;
    var options = {
        amount: Number(amount*100),  // amount in the smallest currency unit
        currency: "INR",
        
      };      
          
    // STEP 2:    
   const order=await razorpayInstance
   .orders.create(options);

 

   res.status(200).json({
    success:true,
    order
   })

    }catch(e){
      return  res.status(400).json({error:e})
      console.log(e)
    }
  
   
};




//payment verify 


exports.paymentVerify=async(req,res)=>{


    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;
    
      const body = razorpay_order_id + "|" + razorpay_payment_id;
    
      const expectedSignature = crypto
        .createHmac("sha256", process.env.Razorpay_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
    
      const isAuthentic = expectedSignature === razorpay_signature;
    
      if (isAuthentic) {
        // Database comes here
    
        // await Payment.create({
        //   razorpay_order_id,
        //   razorpay_payment_id,
        //   razorpay_signature,
        // });
        
    
        res.redirect(
          `https://mern-ecommerce-11.herokuapp.com/order/success`
        );
      } else {
        res.status(400).json({
          success: false,
        });
      }

    }catch(e){
        res.status(400).json({
            success: false,
          });
    }
  
   

}