import React, { useState, useEffect } from 'react';
import { createProduct } from '../api';
import { Button, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { useHistory } from "react-router-dom";


const ProductTest = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // number
  const [price, setPrice] = useState(0);
  // number
  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState(true);

  const handleCreateProduct = async (event) => {
    event.preventDefault();

    const data = await createProduct(
      {
        title,
        description,
        price,
        quantity,
        seller: userData.id,
        availability: availability
      },
      token
    );

    if(typeof data === 'object'){
      history.push(`/products/${data.id}`);
    }else{
      alert(data);
    }
  }

  return (
    <>
      <h2>Create Product</h2>

      <form onSubmit={handleCreateProduct}>

        <TextField 
          type="text" 
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <TextField 
          type="number" 
          label="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField 
          type="number" 
          label="Quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />

        <FormControlLabel
          control={
            <Checkbox 
            checked={availability} 
            color="primary"
            name="delivery" 
            value={availability}
            onChange={(event) => setAvailability(event.target.checked)} 
            />
          }
          label="Avalible"
          />

        <Button type="submit" variant="contained" color="primary">Create</Button>

      </form>
    </>
  );
};

export default ProductTest;
