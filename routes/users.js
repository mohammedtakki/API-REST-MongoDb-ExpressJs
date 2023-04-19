var express = require('express'); 
var router = express.Router(); 
const{register,index,login}=require('../contollers/userController') 
/* GET users listing. */ 
router.get('/',index); 
 
//post register user sà ypo can do this without even thinking so that  
router.post('/register',register) 

router.post('/login',login) 
 
module.exports = router;