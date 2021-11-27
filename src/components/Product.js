import React, { useState, useEffect } from 'react';
import { createProduct, getProduct } from '../api';
import { Button, TextField } from '@material-ui/core';
import { useParams } from 'react-router-dom'


const Product = ({ userData, token }) => {


  const { productId } = useParams();

  const [product, setProduct] = useState(undefined);


  useEffect(async () => {
    const data = await getProduct(productId);
    setProduct(data);
  }, []);

  if(typeof product !== 'object'){
    return <h1>Product does not exist</h1>
  }



  // if(!userData.id){
  //   return (<h1>Please login to see this page</h1>);
  // }

  // Email - Password
  // const [email, setEmail] = useState(userData.email);
  // const [newEmail, setNewEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');

  // Profile
  // const [userProfile, setUserProfile] = useState({});
  // const [publicName, setPublicName] = useState('');
  // const [location, setLocation] = useState('');
  // const [bio, setBio] = useState('');
  // const [occupation, setOccupation] = useState('');
  // const [avatar, setAvatar] = useState('');
  // const [website, setWebsite] = useState('');
  // const [facebookLink, setFacebookLink] = useState('');
  // const [twitterLink, setTwitterLink] = useState('');
  // const [youtubeLink, setYoutubeLink] = useState('');
  // const [pinterestLink, setPinterestLink] = useState('');
  // const [instagramLink, setInstagramLink] = useState('');

  // useEffect(async () => {
  //   const data = await getUserProfile(userData.id);
  //   setUserProfile(data);
  //   setPublicName(data.publicName);
  //   setLocation(data.location);
  //   setBio(data.bio);
  //   setOccupation(data.occupation);
  //   setAvatar(data.avatar);
  //   setWebsite(data.website);
  //   setFacebookLink(data.facebookLink);
  //   setTwitterLink(data.twitterLink);
  //   setYoutubeLink(data.youtubeLink);
  //   setPinterestLink(data.pinterestLink);
  //   setInstagramLink(data.instagramLink);
  // }, []);

  const handleEditProduct = async (event) => {
    event.preventDefault();

    const data = await editUserProfile(
      {
        publicName,
        location,
        bio,
        occupation,
        avatar,
        website,
        facebookLink,
        twitterLink,
        youtubeLink,
        pinterestLink,
        instagramLink,
        id: userData.id
      },
      token
    );

    if(typeof data === 'object'){
      setUserProfile(data);
    }else{
      alert(data);
    }
  }

  return (
    <>
      <h1>Product {product.title}</h1>

      <h2>View</h2>

      <h4>Title: {product.title}</h4>
      <h4>Description: {product.description}</h4>
      <h4>Price: {product.price}</h4>
      <h4>Seller: {product.seller}</h4>
      <h4>Quantity: {product.quantity}</h4>
      <h4>Availability: {product.Availability}</h4>

      <h2>Edit</h2>

      {/* Profile */}
      <form onSubmit={handleEditProduct}>

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

        {/* did I want to just have this for edit? */}
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

        <Button type="submit" variant="contained" color="primary">Save Changes</Button>

      </form>

    </>
  );
};

export default Product;
