const product=require('../models/productModel');
const ErrorHander = require('../utils/errorHander');
const Apifeatures=require('../utils/apifeatures')
const cloudinary = require('cloudinary').v2;


// GET ALL PRODUCT 
exports.getAllProduct=async(req,res)=>{
    //pagination page limit
    const resultPerpage=7;
    //count no of product
    const productsCount=await product.countDocuments();
    
    // const featuresApii=new Apifeatures(product.find(),req.query)
    // .search().filter().pagination(resultPerpage);
    // const  products=await featuresApii.query;
    const apiFeature = new Apifeatures(product.find(), req.query)
    .search()
    .filter().pagination(resultPerpage);
    let products = await apiFeature.query;

//   let products = await apiFeature.query;

//   let filteredProductsCount = products.length;

//   apiFeature.pagination(resultPerpage);

//   products = await apiFeature.query;
// console.log(apiFeature)

// console.log("products",products)
// let filteredProductsCount = products.length;

// apiFeature.pagination(resultPerpage);

// products = await apiFeature.query.clone();
console.log("products",products)

console.log(req.query.page)

    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerpage
    })

}


//create product by admin 
exports.createProduct=async(req,res,next)=>{


    try{


        const {name,description,category,stock,price,image}=req.body;

      

       //new post 
       const result = await cloudinary.uploader.upload(image,{
        floder:"ProductsImage"
    });

    //new data 

    const options={
        name,
        description,
        category,
        stock,
        price,
        user:req.user.id

}
     const Productdata=await product.create(options);
     Productdata.images.push({public_id:result.public_id,url:result.secure_url})
     await  Productdata.save();

     console.log(Productdata)
     res.status(201).json({
         success:true,
         product:Productdata
        })

    }catch(e){
      console.log(e)
      return res.status(201).json({
        success:false,
        message:e.message
       })
    }


     
}



//update product
exports.updateProduct=async(req,res,next)=>{
    const ProductData=await product.findById({_id:req.params.id});
    if(!ProductData){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    const ProductUpdate=await product.findByIdAndUpdate({_id:req.params.id},req.body,{
        new:true,
        runValidators:true,
        
    });
    res.status(201).json({
        success:true,
        ProductUpdate
       })
}


//delete data function
exports.deleteProduct=async(req,res,next)=>{
    const ProductData=await product.findById({_id:req.params.id});
    if(!ProductData){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
    const Productdelete=await product.findByIdAndDelete({_id:req.params.id});
    res.status(201).json({
        success:true,
        Productdelete
       })
}

//get product by Id

exports.getProductbyId=async(req,res,next)=>{
   
    try{
        
        const ProductData=await product.findById(req.params.id);
        if(!ProductData){
            return res.status(500).json({
                success:false,
                message:"Product not found"
            })
        }
        
        res.status(200).json({
            success:true,
            ProductData
           })

    }catch(e){
        console.log(e.message)
        res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }
   

}





// ******************Product review part***************

exports.createReview=async(req,res)=>{

    try{


        const {rating,comment,productId}=req.body;



        const ProductData=await product.findById(productId);
        if(!ProductData){
            return res.status(400).json({
                success:false,
                message:"product not found "
            }) 
        }
       console.log(ProductData,"pro")
    
             ProductData.reviews.push({
                    user:req.user._id,
                    name:req.user.name,
                    rating:rating,
                    comment:comment
    
                });
                ProductData.numOfReviews=Productdata.reviews.length;
    
                let sum=0;
    
               sum=  Productdata.reviews.map((eachREV)=>{
                    return  sum+=eachREV.rating;
                });
                console.log('sum',sum)
                Productdata.ratings=(sum/Productdata.reviews.length);
                
        await  Productdata.save();
        res.status(200).json({
            success:true,
            message:"Review Done successfully"
        })
    
             
            
     
    
   
        // await  Productdata.save();
        // res.status(200).json({
        //     success:true,
        //     message:"Review Done successfully"
        // })
    

    }catch(e){
        console.log("error while review product")
        res.status(400).json({err:e})
    }
    
}




//get all product by admin

// GET ALL PRODUCT 
exports.getAllProductbyAdmin=async(req,res)=>{

   

const productsData=await product.find({})
console.log("products",productsData)



    res.status(200).json({
        success:true,
        products:productsData
       
    })

}

//delete product by admin

exports.deleteProductbyAdmin=async(req,res)=>{

   

    const productsData=await product.findByIdAndRemove(req.params.id)
    console.log("products",productsData)
    
     if(productsData){
        return res.status(200).json({
            success:true,
             message: "Product Not found "
           
        })
     }
    
        res.status(200).json({
            success:true,
            message:" product deleted"
           
        })
    
    }
    

