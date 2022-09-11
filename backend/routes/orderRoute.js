const express=require('express')
const router=express.Router();
const {IsLogin,IsAdmin}=require('../middleware/userAuth')
const {newOrder,myOrder,getAllOrderBYAdmin,deleteOrderByAdmin,updateOrder}=require('../controlllers/orderController')

router.route('/order/new').post(IsLogin,newOrder);
router.route('/me/orders').get(IsLogin,myOrder);
router.route('/admin/orders').get(IsLogin,IsAdmin("admin"),getAllOrderBYAdmin);
router.route('/admin/order/:id').delete(IsLogin,IsAdmin("admin"),deleteOrderByAdmin).put(IsLogin,IsAdmin("admin"),updateOrder);



module.exports=router;