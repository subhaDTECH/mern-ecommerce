const mongoose=require('mongoose')
const User=require("./userModel")
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter the product name '],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please Enter some description'],
        trim:true
    },
    price:{
       type:Number,
       required:[true,"Please Enter the Product price"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String ,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Plaese Eneter the product category"]

    },
    stock:{
        type:Number,
        required:[true,"please Enter Product stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.SchemaTypes.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:String,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            },

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('product',productSchema);