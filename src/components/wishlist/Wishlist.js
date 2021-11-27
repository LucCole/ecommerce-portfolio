import React, { useState, useEffect } from 'react';
// import { addProductToWishlist } from '.../api';
import { Button, TextField } from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";
import { getWishlist, removeProductFromWishlist } from '../../api';

const Wishlist = ({ userData, token }) => {

  const [wishlist, setWishlist] = useState([]);

  const { userId } = useParams();


  useEffect(async () => {
    const data = await getWishlist(userId);
    console.log(data);
    if(typeof data === 'object'){
      setWishlist(data);
    }
  }, []);



  // const handleCreateProduct = async (event) => {
  //   event.preventDefault();

  //   const data = await createProduct(
  //     {
  //       productId,
  //       userId: userData.id
  //     },
  //     token
  //   );

  //   if(typeof data === 'object'){
  //     history.push(`/products/${data.id}`);
  //   }else{
  //     alert(data);
  //   }
  // }

  return (
    <>
      
      <h1>Wishlist</h1>
      {
        wishlist.map((wishlistEntry) => {
          console.log('wishlistEntry', wishlistEntry)
          return (
            <>
              <h3>{wishlistEntry.title}</h3>
              {
                wishlistEntry.userId === userData.id
                ?
                <Button variant="contained" color="primary" onClick={async () => {
                  // should change wishlistEntry.id to wishlistEntry.productId
                  const data = await removeProductFromWishlist(
                    {
                      wishlistId: wishlistEntry.wishlistId,
                      productId: wishlistEntry.id
                    },
                    token
                  );
              
                  if(typeof data === 'object'){
                    const newWishlist = await getWishlist(userId);
                    console.log(data);
                    if(typeof newWishlist === 'object'){
                      setWishlist(newWishlist);
                    }else{
                      alert(newWishlist);
                    }
                  }else{
                    alert(data);
                  }
                }}>remove</Button>
                :
                ''
              }
            </>
          );
        })
      }
      {/* <h2>Add product to wishlist</h2>

      <form onSubmit={handleCreateProduct}>

        <TextField 
          type="number" 
          label="ProductId"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Add</Button>

      </form> */}
    </>
  );
};

export default Wishlist;
