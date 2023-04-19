
const Joi = require ('joi');
exports.validateProduct = (req, res, next) => {
    
    const valid = Joi.object({
    title : Joi.string().min(10).max(50).required(),
    // content : Joi.string().uppercase().min(10).max(50).required(),
    price : Joi.number().integer().positive().required(), 
    description : Joi.string().uppercase().min(10).max(200).required(),
    rating : Joi.number().required(),
    // isFeatured : Joi.boolean().required(),
    countStock: Joi.number().integer().required(),
    brand : Joi.string().required(),
    // thumbnail : Joi.string().required(),   
    category : Joi.string().required(),
    // created_at : Joi.date().required(),
    // updated_at : Joi.date().required(),
    images : Joi.string(),

  })
//   return res.json(valid.validate(req.body))
  const  {error} = valid.validate(req.body)
//   return res.json(error)
  if(error){
      
      const {path,message}=error?.details[0];
  
      
      const myError = {
          path: path[0],
         message 
      }
  
      
      return res.json({
         error : myError,
          message : "verifier la validation du champ"
      });
  }
  next()
}





exports.validateCategory = (req, res, next) => {
    
    const valid = Joi.object({
    label : Joi.string().uppercase().min(10).max(50).required(),
    icon : Joi.string().required(),
    color : Joi.string().required()
  
   
   

  })

  const  {error} = valid.validate(req.body)

  if(error){
      
      const {path,message}=error?.details[0];
  
      
      const myError = {
          path: path[0],
         message 
      }
  
      
      return res.json({
         error : myError,
          message : "verifier la validation du champ"
      });
  }
  next()
}