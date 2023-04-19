const {model , Schema} = require('mongoose')

const SchemaUser = new Schema({
    name :{
        type : String ,
        required : true 
    },
    email : {
        type : String,
        required : true ,
        unique : true 

    },
    password : {
        type : String,
        required : true
    },
    adresse : String,
    city : String,
    country : String,
    phone : String,
    isAdmin : {
        type : Boolean,
        default : false
    }

})
module.exports = model('User',SchemaUser)
