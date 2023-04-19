var express = require('express');
var router = express.Router();
const {validateProduct} = require('./../middleware/validation')
const {index , show , store,update,patch ,supprimer, search, storeImages}= require('./../contollers/productController')
const multer = require('multer')
const path=require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,`${__dirname}/../public/images` )
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix  + '-' + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage })
/* GET home page. */
router.get('/',index);
router.get('/search',search);   
router.get('/:id',show);
router.post('/',upload.single('thumbnail') ,validateProduct,store);
router.post('/storeImages',upload.array('images'),storeImages);
router.put('/:id',[upload.single('thumbnail'),validateProduct],update);
router.patch('/:id',validateProduct,patch)
router.delete('/:id',supprimer)

module.exports = router;
