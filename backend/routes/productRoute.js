const express=require("express")
const { 
    getAllProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    getProductbyId,
    createReview ,getAllProductbyAdmin,deleteProductbyAdmin}
 = require("../controlllers/productController")
const router=express.Router()
const {IsLogin,IsAdmin}=require('../middleware/userAuth')

//GET ALL PRODUCTS
router.route('/products').get(getAllProduct);




// UPDATE A PRODUCT BY ADMIN 
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductbyId);
router.route('/review').put(IsLogin,createReview);





// admin 
//CREATE A NEW  BY ADMIN PRODUCT
router.route('/admin/product/new').post(IsLogin,IsAdmin("admin"),createProduct);


//GET ALL PRODUCTS
router.route('/admin/products').get(IsLogin,IsAdmin("admin"),getAllProductbyAdmin);


// delete product by admin 

router.route('/admin/product/:id').delete(IsLogin,IsAdmin("admin"),deleteProductbyAdmin);


module.exports=router;