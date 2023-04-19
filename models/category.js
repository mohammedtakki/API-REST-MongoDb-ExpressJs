const mongoose = require('mongoose');

const schemaCategory = new mongoose.Schema({
    label : String,
    icon : String ,
    color : String,
   
})

module.exports = mongoose.model('Category',schemaCategory)