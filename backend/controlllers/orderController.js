const Order=require("../models/orderModel")

//create new order
exports.newOrder=async(req,res,next)=>{
    try{
        const {
            shippingInfo,
            orderItems,
            amount
            
           
          } = req.body;
        
        const order= await Order.create({
            shippingInfo,
            orderItems,
           
            totalPrice: amount,
            paidAt: Date.now(),
            user: req.user._id,
        });

    res.status(201).json({
        success:true,
        order,
    })

    }catch(e){
        console.log(e)
    }
    
    


}

//get all orders 
exports.GetAllOrders=async(req,res,next)=>{
    try{
       const order=await Order.find({});
       if(!order){
           return res.status(400).json({
               success:false,
               message:"No Order Found"
           })
       }

       res.status(200).json({
           success:true,
           order
       })


    }catch(e){
        console.log(e);
    }

}


//get single order

exports.GetSingleOrder=async(req,res,next)=>{

    try{
       const order=await Order.findById(req.params.id).populate("user","name email");
       if(!order){
        return res.status(400).json({
            success:false,
            message:"No Order Found"
        })
    }
    res.status(200).json({
        success:true,
        order
    })

    }catch(e){
        console.log(e);
    }
}



//get all my order
exports.myOrder=async(req,res,next)=>{

    try{
        const orders=await Order.find({user:req.user._id});
        if(!orders){
            return res.status(400).json({
                success:false,
                message:"No Order Found"
            })
        }
        res.status(200).json({
            success:true,
            orders
        })

    }catch(e){
        console.log(e);
    }
}


// *************admin access*******************


//get all order and total amount  by admin
exports.getAllOrderBYAdmin=async(req,res)=>{

    try{

 const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });


    }catch(e){
        console.log(e)
    }

}



//update order status by admin
exports.updateOrder=async(req,res,next)=>{

    try{

        const order = await Order.findById(req.params.id);

        if (!order) {
          return next(res.status(400).json({success:false,message:"Not found "}));
        }
      
        if (order.orderStatus === "Delivered") {
          return next(res.status(400).json({success:false,message:"Your order Deliverd already"}));
        }
      
        if (req.body.status === "Shipped") {
          order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
          });
        }
        order.orderStatus = req.body.status;
      
        if (req.body.status === "Delivered") {
          order.deliveredAt = Date.now();
        }
      
        await order.save({ validateBeforeSave: false });
        res.status(200).json({
          success: true,
        });

    }catch(e){
        console.log(e)
    }

}


async function updateStock(id, quantity) {
    const product = await Product.findById(id);
  
    product.Stock -= quantity;
  
    await product.save({ validateBeforeSave: false });
  }


//delete order by admin

exports.deleteOrderByAdmin=async(req,res,next)=>{
    try{
      const order=await Order.findById(req.params.id);
      if(!order){
        return res.status(400).json({
            success:false,
            message:"No Order Found"
        })
    }
    await order.remove();
    res.status(200).json({
        success:true,
        
        message:"Order Delete successfully"
    })

      

    }catch(e){
        console.log(e);
    }
}



