const mongoose = require('mongoose');

const schemaProduct = new mongoose.Schema({
    title : {
        type : String,
        required:true,
        min : 4
    },
    description : String,
    brand : String,
    countStock : {
        type : Number,
        default : 0
    },
    content : String,
    price : Number ,
    thumbnail : String,
    rating : {
        type :Number,
        enum : [0,1,2,3,4,5],
        default : 0
    },
    isFeatured : {
        type : Boolean, 
        default : false 
    },
    created_at :{
        type : Date ,
        default :Date.now
    },
    updated_at : {
        type : Date ,
        default : Date.now
    },
    images : [String],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category'
    }
})

module.exports = mongoose.model('Product',schemaProduct)