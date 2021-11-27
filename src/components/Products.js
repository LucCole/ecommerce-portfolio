import React, { useState, useEffect } from 'react';
import { getProducts } from '../api';
import { Button, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom'


const Products = ({ userData, token }) => {

  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const data = await getProducts();
    console.log(data);
    if(typeof data === 'object'){
      setProducts(data);
    }
  }, []);

  if(products.length === 0){
    return 'No products yet!';
  }

  return (
    <>
      <h1>Products</h1>
      {
        products.map((product) => {
          return <h3>{product.title}</h3>;
        })
      }
    </>
  );
};

export default Products;
