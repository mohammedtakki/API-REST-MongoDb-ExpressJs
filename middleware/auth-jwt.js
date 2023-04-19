const {expressjwt : jwt }= require('express-jwt')
require('dotenv').config()

const authJwt = (req,res)=> {
    let  secret = process.env.SECRET_KEY
     

    return jwt({
        secret,
        algorithms : ['HS256']
    })
    .unless({path :[
        {url :"/users/login"},
        {url :"/users/register"},
        {url : '/products',methods : ['POST','GET']},
        {url : '/products/storeImages',methods : ['POST']},
        {
            url : '/categories',methods: ['GET','POST']
        },
      
    ]}
    )
}
module.exports = authJwt