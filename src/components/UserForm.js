// if they are logged in don't display this page. Send them to there user profile

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { callApi } from "../api";
import { Button, TextField } from '@material-ui/core';

const UserForm = ({ action, setToken, setUserData }) => {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLogin = action === 'login';
  const title = isLogin ? 'Login' : 'Register';
  const oppositeAction = isLogin ? 'register' : 'login';
  const oppositeTitle = isLogin ? 'Register' : 'Login';

  const formSubmit = async (event) => {
    event.preventDefault();

    const body = {username, password}

    if(!isLogin){
      body.email = email;
    }
    
    // !! put in the call api functions
    const data = await callApi({
      url: `users/${action}`,
      body: body,
      method: 'POST'
    });

    if(typeof data === 'object'){
      localStorage.setItem( 'ecommerce-project-token', data.token );
      setToken(data.token);
      setUserData(data.user);
      history.push('/users/profile');
    }else{
      alert(data);
    }
  };

  return (
    <>
      <form onSubmit={formSubmit}>

        <h2 id="registerhead">Welcome, Please {title}</h2>

        <TextField 
          type="text" 
          label="Username" 
          required
          minLength="3"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        {isLogin ?  null :
        <TextField 
          type="email" 
          label="Email" 
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        }

        <TextField 
          type="password" 
          label="Password" 
          required
          minLength="8"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button 
          variant="contained" 
          type="submit">
          {title}
        </Button>

        <p> {isLogin ? "Don't have" : 'Have'} an Account?</p>
        <Button 
          variant="contained" 
          type="submit">
          <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
        </Button>
      </form>
    </>
  );
};

export default UserForm;