const express=require("express")
const app=express()
const path = require("path");
const ErrorHanderMiddleware=require('./middleware/error')


if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

const RroductRouter=require('./routes/productRoute')
const UserRouter=require("./routes/userRoute")
const OrderRouter=require('./routes/orderRoute')
const paymentRouter=require('./routes/paymentRoutes')
const cookieParser=require('cookie-parser')

//middleware
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/api/v1',RroductRouter);
app.use('/api/v1',UserRouter);
app.use('/api/v1',OrderRouter);
app.use('/api/v1',paymentRouter);



app.get('/api/v1/get/key',(req,res)=>{
    res.status(200).json({
        key:process.env.Razorpay_KEY_ID
    })
})




app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports=app;