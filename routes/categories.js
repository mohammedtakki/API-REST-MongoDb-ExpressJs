var express = require('express');
var router = express.Router();

// Import the functions from ProductController
const { index, show, store, update, patch } = require('./../contollers/CategoryController')
const{validateCategory}=require('./../middleware/validation')

/* GET home page. */
router.get('/', index);
/* GET home page. */
router.get('/:id', show);

/* PUT a product. */
router.put('/:id', update);

/* PATCH a product. */
router.patch('/:id', patch);

/* POST Product. */
router.post('/',validateCategory, store);

module.exports = router;



module.exports = router;