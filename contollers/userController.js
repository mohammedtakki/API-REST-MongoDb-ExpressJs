const User=require('../models/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.index = async (req, res, next) => {
    try {
        const user = await User.find()
        if(!user){
            return res.json('no user founded in the DB')
        }
        return res.json(user)
        
    } catch (error) {
        return res.status(500).json({ message:error.message, success:false, error})
  
    }
}


exports.register=async(req,res)=>{ 
    let { name,email,password,adresse,city,country,phone}= req.body 
    const myUser =new User({ 
        name, 
        email, 
        password: bcrypt.hashSync(password, 10), 
        adresse, 
        city, 
        country, 
        phone, 
    }) 
  
        
    
    try{ 
        const result= await myUser.save() 
        res.status(201).json({ 
            success:true, 
            result 
        }) 
    }catch(error){ 
        res.status(404).json({ 
            success:false, 
            message:"can't save user" 
        }) 
    } 
}

exports.login = async (req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email : email}, 'name email password')

   

    if(!user){
        return res.status(404).json({
            success : false,
            message : "email or password is wrong !"
        })
    }
    if(user && bcrypt.compareSync(password,user.password)){

        const secret = process.env.SECRET_KEY

       const token =  jwt.sign({
        userId: user._id,
        name : user.name
       }, secret ,{expiresIn:60} )


        return res.status(200).json({
            success : true ,
            message : "user is authenticated",
            user : user.name,
            token
        }) 

    }
    res.status(400).json({
        success : false ,
        message : "email or password is wrong",
     
    })
}