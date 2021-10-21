import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../api';
import { Button, TextField } from '@material-ui/core';
import { editUserProfile, editUserEmail, editUserPassword } from "../api";

const UserProfile = ({ userData, token }) => {

  if(!userData.id){
    return (<h1>Please login to see this page</h1>);
  }

  // Email - Password
  const [email, setEmail] = useState(userData.email);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Profile
  const [userProfile, setUserProfile] = useState({});
  const [publicName, setPublicName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [occupation, setOccupation] = useState('');
  const [avatar, setAvatar] = useState('');
  const [website, setWebsite] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [pinterestLink, setPinterestLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');

  useEffect(async () => {
    const data = await getUserProfile(userData.id);
    setUserProfile(data);
    setPublicName(data.publicName);
    setLocation(data.location);
    setBio(data.bio);
    setOccupation(data.occupation);
    setAvatar(data.avatar);
    setWebsite(data.website);
    setFacebookLink(data.facebookLink);
    setTwitterLink(data.twitterLink);
    setYoutubeLink(data.youtubeLink);
    setPinterestLink(data.pinterestLink);
    setInstagramLink(data.instagramLink);
  }, []);

  // Do I need to return anything?
  const handleEditUserEmail = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords don't match.");
      return;
    }else if(email === newEmail){
      alert('This email is already asigned to this user.');
      return;
    }

    // need to login and check if same user
    const data = await editUserEmail(
      {
        newEmail,
        password, 
        id: userData.id
      },
      token
    );

    if(typeof data === 'object'){
      setEmail(data.email);
      return;
    }else{
      alert(data);
      return;
    }
  }

  const handleEditUserPassword = async (event) => {
    event.preventDefault();
    
    if(password !== confirmPassword){
      alert("Passwords don't match.");
      return;
    }

    // need to login and check if same user
    const data = await editUserPassword(
      {
        newPassword,
        password, 
        id: userData.id
      },
      token
    );

    if(typeof data === 'object'){
      alert('Password changed');
      return;
    }else{
      alert(data);
      return;
    }
  }

  const handleEditUserProfile = async (event) => {
    event.preventDefault();

    // need to login and check if same user
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
      <h1>Your Profile</h1>

      <h2>View</h2>

      <h4>Public Name: {userProfile.publicName}</h4>
      <h4>Location: {userProfile.location}</h4>
      <h4>Bio: {userProfile.bio}</h4>
      <h4>Occupation: {userProfile.occupation}</h4>
      <h4>Avatar: {userProfile.avatar}</h4>
      <h4>Website Link: {userProfile.website}</h4>
      <h4>Facebook Link: {userProfile.facebookLink}</h4>
      <h4>Twitter Link: {userProfile.twitterLink}</h4>
      <h4>YouTube Link: {userProfile.youtubeLink}</h4>
      <h4>Pinterest Link: {userProfile.pinterestLink}</h4>
      <h4>Instagram Link: {userProfile.instagramLink}</h4>

      <h2>Edit</h2>

      {/* Profile */}
      <form onSubmit={handleEditUserProfile}>

        <TextField 
          type="text" 
          label="Public Name"
          value={publicName}
          onChange={(event) => setPublicName(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Occupation"
          value={occupation}
          onChange={(event) => setOccupation(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Website Link"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Facebook Link"
          value={facebookLink}
          onChange={(event) => setFacebookLink(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Twitter Link"
          value={twitterLink}
          onChange={(event) => setTwitterLink(event.target.value)}
        />
        <TextField 
          type="text" 
          label="YouTube Link"
          value={youtubeLink}
          onChange={(event) => setYoutubeLink(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Pinterest Link"
          value={pinterestLink}
          onChange={(event) => setPinterestLink(event.target.value)}
        />
        <TextField 
          type="text" 
          label="Instagram Link"
          value={instagramLink}
          onChange={(event) => setInstagramLink(event.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Save Changes</Button>

      </form>

      {/* Email */}

      <h1>Your Email</h1>
      <h4>Email: {email}</h4>

      <form onSubmit={handleEditUserEmail}>
        <TextField 
          type="text" 
          label="New Email"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <TextField 
          type="password" 
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField 
          type="password" 
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Save New Email</Button>

      </form>

      {/* Password */}
      <form onSubmit={handleEditUserPassword}>

        <TextField 
          type="password" 
          label="New Password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <TextField 
          type="password" 
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField 
          type="password" 
          label="Confirm Password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">Save New Password</Button>

      </form>
    </>
  );
};

export default UserProfile;
