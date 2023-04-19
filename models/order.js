const {Schema , model} = require ('mongoose')

const orderSchema = new Schema({
    shippingAddress : {
        type : String ,
        required : true 
    },
    invoiceAdrress : String ,
    city : String ,
    country : String ,
    phone : {
        type : String ,
        required : true 
    },
    status : {
        type : String ,
        enum : ['shipped' , 'received','cancled','pending']
    },
    total : Number ,
    user : {
        type : Schema.Types.ObjectId, ref:'User',
    },
    created_at : {
        type : Date,
        default : Date.now
    },
    orderItems : [{
        type : Schema.Types.ObjectId,ref : 'OrderItem'
    }],
    updated_at : {
        type : Date,
        default : Date.now
    },
})

module.exports = model ('order', orderSchema)