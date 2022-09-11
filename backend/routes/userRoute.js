const express=require("express")
const router=express.Router()
const {IsLogin,IsAdmin}=require("../middleware/userAuth.js")
const {registerUser,loginUser,UserLogout,forgotPassword,
    resetPassword,getUserDetails,updatePasword,updateProfile,
    getAlluserBYAdmin,getOneUserByAdmin,
    updateProfileByAdmin,
    DeleteOneUserByAdmin
}=require("../controlllers/userController")



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(UserLogout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(IsLogin,getUserDetails);
router.route('/password/update').put(IsLogin,updatePasword);
router.route('/me/update').put(IsLogin,updateProfile);
router.route('/admin/users').get(IsLogin,IsAdmin("admin"),getAlluserBYAdmin);
router.route('/admin/user/:id').get(IsLogin,IsAdmin("admin"),getOneUserByAdmin)
.put(IsLogin,IsAdmin("admin"),updateProfileByAdmin).delete(IsLogin,IsAdmin("admin"),DeleteOneUserByAdmin);





module.exports=router;