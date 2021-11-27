import React, { useState } from 'react';
import { addProductToWishlist } from '../../api';
import { Button, TextField } from '@material-ui/core';


const WishlistForm = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }


  
  const [productId, setProductId] = useState(1);

  const handleAddProductToWishlist = async (event) => {
    event.preventDefault();

    const data = await addProductToWishlist(
      {
        productId,
        userId: userData.id
      },
      token
    );

    if(typeof data === 'object'){
      alert('Added '+data.id+' to wishlist');
    }else{
      alert(data);
    }
  }

  return (
    <>
      WishlistForm
      <h2>Add product to wishlist</h2>

      <form onSubmit={handleAddProductToWishlist}>

        <TextField 
          type="number" 
          label="ProductId"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Add</Button>

      </form>
    </>
  );
};

export default WishlistForm;
