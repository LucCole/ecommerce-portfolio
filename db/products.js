// TODO
/*
  What about if update info isnt all passed in

  - need category
    get by category


  IDEAS
    get active products
    get inactive products
    (should this already be a thing in the getuserproducts thing?)
*/

const { client } = require('./client');

async function createProduct({ title, description, price, seller, quantity, availability }) {
  try {
    const {rows: [product]} = await client.query(`
    INSERT INTO products(title, description, price, seller, quantity, availability) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
    `, [title, description, price, seller, quantity, availability]);
    return product;
  } catch (error) {
    throw error;
  }
}

async function editProduct({ title, description, price, quantity, productId }) {
  try {
    const {rows: [product]} = await client.query(`
    UPDATE products
    SET
      title=$1,
      description=$2,
      price=$3,
      quantity=$4
    WHERE id=$5
    RETURNING *;
    `, [title, description, price, quantity, productId]);
    return product;
  } catch (error) {
    throw error;
  }
}

// will need to pass in the new avalibility
async function changeAvailability({ availability, productId }) {
  try {
    const {rows: [product]} = await client.query(`
    UPDATE products
    SET availability=$1
    WHERE id=$2
    RETURNING *;
    `, [availability, productId]);
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProduct(productId) {
  try {
    const {rows: [product]} = await client.query(`
    SELECT *
    FROM products
    WHERE id=$1;
    `, [productId]);

    console.log('getProduct'+product);
    return product;
  } catch (error) {
      throw error;
  }
}

async function getAllProducts() {
  try {
    const {rows: product} = await client.query(`
    SELECT *
    FROM products;
    `);
    return product;  
  } catch (error) {
      throw error;
  }
}

async function getUsersProducts(userId) {
  try {
    const {rows: products} = await client.query(`
    SELECT *
    FROM products
    WHERE seller=$1;
    `, [userId]);
    return products;  
  } catch (error) {
      throw error;
  }
}

module.exports = {
  createProduct,
  editProduct,
  changeAvailability,
  getProduct,
  getAllProducts,
  getUsersProducts
}