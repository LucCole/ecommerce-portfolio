const express = require('express');
const wishlistRouter = express.Router();
const { requireUser } = require('./middleware');

const { 
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistEntry,
  getWishlist
} = require('../db'); 

// POST /api/wishlist/add
wishlistRouter.post('/add', requireUser, async (req, res, next) =>{
  try{
    const wishlistEntry = await addProductToWishlist(req.body);
    res.send(wishlistEntry);
  } catch(error){
     next(error);
  }
});

// DELETE /api/wishlist/delete
wishlistRouter.delete('/delete', requireUser, async (req, res, next) =>{
  try{

    const wishlistEntryTest = await getWishlistEntry(req.body.wishlistId)

    if(req.user.id !== wishlistEntryTest.userId){
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this product to perform this action"
      });
    }
    
    const wishlistEntry = await removeProductFromWishlist(req.body.productId, req.user.id);
    res.send(wishlistEntry);
  } catch(error){
     next(error);
  }
});

// GET /api/wishlist/product/:productId
wishlistRouter.get('/product/:productId', async (req, res, next) =>{
  try{
    const wishlistEntry = await getWishlistEntry(req.params.productId);
    res.send(wishlistEntry);
  } catch(error){
     next(error);
  }
});

// GET /api/wishlist/:userId
wishlistRouter.get('/:userId', async (req, res, next) =>{
  try{
    console.log('req.params.userId: ', req.params.userId);
      const wishlist = await getWishlist(req.params.userId);
      res.send(wishlist);
  } catch(error){
     next(error);
  }
});

module.exports = wishlistRouter;
