const {Schema , model} = require('mongoose')

const schemaOrderItems = new Schema({
     product : {
        type : Schema.Types.ObjectId,ref:'Product',
        required : true 
     },
     quantity : {
        type : String ,
        required : trusted,
     },

})
module.exports = model ('OrderItem', schemaOrderItems)