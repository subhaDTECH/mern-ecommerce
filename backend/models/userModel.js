const mongoose=require('mongoose')
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Crypto=require("crypto")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter your name"],
        minlength:[4,"should have 4 character"],
        maxlength:[30,"should not have more than 30 caharacters"]
    },
    email:{
        type:String,
        required:[true,"please Enter your Email"],
        validate:[validator.isEmail,"please enter a valid Email"],
        unique:true,

    },
    password:{
        type:String,
        required:[true,"please Enter your Password"],
        minlength:[8,"password should be greater than 8 character"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
           
        },
        url:{
            type:String,
            
        },
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
    try{
        //password modifie na hole simple next
        if(!this.isModified("password")){
            next();
       }
       //change hola hash
       this.password=await bcrypt.hash(this.password,10);

    }catch(e){
        console.log(e)
    }

   
     

})


userSchema.methods.getJWTToken=async function(){
    try{
        const token=await jwt.sign({id:this._id},process.env.JWT_SCERET_KEY,{
            expiresIn: process.env.JWT_EXPIRE,
        });
        return token;

    }catch(e){
        console.log(e)
    }
    

}

//generate resetPasswordtoken
userSchema.methods.getPasswordToken=async function(){

    //generate refreash token 
    const refreashtoken=  await Crypto.randomBytes(20).toString("hex");

    //hash the token and save 
    this.resetPasswordToken=await Crypto.createHash('sha256')
    .update(refreashtoken).digest("hex");

    //15 minitute 60 second 1000 mileseconds
    this.resetPasswordExpire=Date.now()+ 15 * 60 *1000;

    //return the refreash token
    return refreashtoken;


}


module.exports=mongoose.model('User',userSchema);