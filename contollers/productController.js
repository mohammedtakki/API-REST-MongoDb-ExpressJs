const Product = require('./../models/product');
const mongoose =require('mongoose')// c'est l'intermediaire


exports.index = async (req, res, next)=> {
 
   try {
    const products = await Product.find().populate('category');
   
    res.json({ 
        products,
        success:true
    });

  }catch(error){
    res.status(500).json({success : false})
  }
}

  exports.store = (req,res)=>{
   
    let{title,content,price,category ,description , rating ,isFeatured,countStock,brand,created_at,updated_at } = req.body
    let thumbnail = req.file.originalname
   
   
    const myProduct = new Product({
        title : title,
        content : content,
        price : price,
        description,
        rating,
        isFeatured,
        countStock,
        brand,
        thumbnail,
        category ,
       
        updated_at,
        created_at
    })
    myProduct.save()

    .then(insertedProduct =>{
        res.status(201).json({
            product : insertedProduct,
            success : true
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err,
            success : false
        })
    })
  }

  exports.storeImages = (req,res)=>{
    
    // let files = req.files

    let images = req.files

    // return res.json(req.files)
    const myProduct = new Product({
    images : images
    })
    myProduct.save()

    .then(insertedProduct =>{
        res.status(201).json({
            product : insertedProduct,
            success : true
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err,
            success : false
        })
    })
   
  }


  exports.show = async (req, res, next)=> {
    let {id}  = req.params

    if(!mongoose.isValidObjectId(id)){// hada tivalidi lina syntaxe ola structure dial id wach s7i7 olala
        return res.status(400).json({
            success : false ,
            message : "id is not valid !"
        })
    }
    try {
        const products = await Product.findById(id);// hada tichof lina wach dk id exist f product
        if(!products){
         return   res.status(400).json({
            success : false,
            message : "product not found !"

            })
        }
        res.json({ 
            products,
            success:true
        });
    
      }catch(error){
        res.status(500).json({success : false})
      }
    // res.json({ title: 'get one product'+id });
  }

  exports.update = async (req, res, next)=> {
    let {id}  = req.params

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success : false ,
            message : "id is not valid !"
        })
    }
    let{title , content , price } =req.body;
    try {
        const products = await Product.findOneAndReplace({'_id':id},req.body);
        if(!products){
         return   res.status(400).json({
            success : false,
            message : "product not found !"

            })
        }
        res.json({ 
            products,
            success:true
        });
    
      }catch(error){
        res.status(500).json({success : false})
      }
    // res.json({ title: 'get one product'+id });
  }

  exports.patch = async (req, res, next)=> {
    let {id}  = req.params

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success : false ,
            message : "id is not valid !"
        })
    }
    let{title , content , price } =req.body;
    try {
        const products = await Product.findOneAndUpdate({'_id':id},req.body);
        if(!products){
         return   res.status(400).json({
            success : false,
            message : "product not found !"

            })
        }
        res.json({ 
            products,
            success:true
        });
    
      }catch(error){
        res.status(500).json({success : false})
      }
    // res.json({ title: 'get one product'+id });
  }

  exports.supprimer = async (req, res, next)=> {
    let {id}  = req.params

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success : false ,
            message : "id is not valid !"
        })
    }
    let{title , content , price } =req.body;
    try {
        const products = await Product.findOneAndDelete({'_id':id},req.body);
        if(!products){
         return   res.status(400).json({
            success : false,
            message : "product not found !"

            })
        }
        res.json({ 
            products,
            success:true
        });
    
      }catch(error){
        res.status(500).json({success : false})
      }
    // res.json({ title: 'get one product'+id });
  }

  exports.search = async (req ,res)=>{
    let search = req.query.search
    let fields = req.query.fields
    // let segment = req.params.segment
    if(search){

        try{
          let result = await Product.find({$or:[
            {title : {$regex :search,'$options':'i'}},// hadi bach kat searchi wakha tkon majuscule ola minuscule
            {description : {$regex :search,'$options':'i'}},
          
          ]})
          .select(fields)
          .sort({'created_at':-1})
          // return res.json(search)
          if(!result  ){
            return res.status(404).json({
              success : false ,
              message : " product not found"
            })
          }
          res.json({
            products : result,
            message : true

          })
        }
        catch(error){
            res.status(500).json({
              success : false
            })
        }
   
    }
    
  }