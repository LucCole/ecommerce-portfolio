
const { client } = require('./client');

async function addProductToWishlist({ productId, userId }) {
  try {
    const {rows: [wishlistEntry]} = await client.query(`
    INSERT INTO wishlist("productId", "userId") 
    VALUES ($1, $2)
    RETURNING *;
    `, [productId, userId]);
    return wishlistEntry;
  } catch (error) {
    throw error;
  }
}

async function removeProductFromWishlist(productId, userId) {
  console.log(productId, userId);
  try {
    const {rows: [wishlistEntry]} = await client.query(`
    DELETE FROM wishlist
    WHERE "productId"=$1 AND "userId"=$2
    RETURNING *;
    `, [productId, userId]);
    console.log('after');
    console.log('wishlistEntry: ', wishlistEntry);
    return wishlistEntry;
  } catch (error) {
    throw error;
  }
}

async function getWishlistEntry(wishlistId) {
  try {
    console.log('before');
    const {rows: [wishlistEntry]} = await client.query(`
    SELECT wishlist.id AS "wishlistId", wishlist."userId", products.*
    FROM wishlist
    JOIN products ON products.id = wishlist."productId"
    WHERE wishlist.id=$1;
    `, [wishlistId]);
    console.log('after');

    console.log('wishlistEntry: ', wishlistEntry);
    return wishlistEntry;
  } catch (error) {
    throw error;
  }
}

async function getWishlist(userId) {
  console.log('userId: ', userId);
  try {
    const {rows: wishlist} = await client.query(`
    SELECT wishlist.id AS "wishlistId", wishlist."userId", products.*
    FROM wishlist
    JOIN products 
    ON wishlist."productId" = products.id
    WHERE wishlist."userId"=$1;
    `, [userId]);
    return wishlist;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToWishlist,
  removeProductFromWishlist,
  getWishlistEntry,
  getWishlist
}
