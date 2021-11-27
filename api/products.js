const express = require('express');
const productsRouter = express.Router();
const { requireUser } = require('./middleware');

const { 
  createProduct,
  editProduct,
  changeAvailability,
  getProduct,
  getAllProducts,
  getUsersProducts
} = require('../db'); 


// POST /api/products
productsRouter.post('/', requireUser, async (req, res, next) =>{
  try{
      const product = await createProduct(req.body);
      res.send(product);
  } catch(error){
     next(error);
  }
});


// PATCH /api/products/:productId
productsRouter.patch('/:productId', requireUser, async (req, res, next) => {
  try {

    const productTest = getProduct(req.params.productId);
    
    if(req.user.id !== productTest.seller){
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this product to perform this action"
      });
    }

    // id needs to be added
    const product = await editProduct(req.body);
    res.send(product);
  } catch (error) {
    next(error)
  }
});

// // PATCH /api/products
// productsRouter.patch('/availability/:productId', requireUser, async (req, res, next) => {
//   try {

//     const productTest = getProduct(req.params.productId);

//     if(req.user.id !== productTest.seller){
//       res.status(403);
//       next({
//         name: "WrongUserError",
//         message: "You must be the same user who created this product to perform this action"
//       });
//     }

//     // id needs to be added req.params.productId
//     const product = await changeAvailability(req.body);
//     res.send(product);
//   } catch (error) {
//     next(error)
//   }
// });

// GET /api/products/:productId
productsRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await getProduct(req.params.productId);
    res.send(product);
  } catch (error) {
    next(error)
  }
});

// GET /api/products/
productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error)
  }
});

// GET /api/products/user/:userId
productsRouter.get('/user/:userId', async (req, res, next) => {
  try {
    const product = await getUsersProducts(req.params.userId);
    res.send(product);
  } catch (error) {
    next(error)
  }
});

module.exports = productsRouter;
