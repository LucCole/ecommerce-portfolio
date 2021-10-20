import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { getUser } from '../api';

const App = () => {

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  // token / userData
  useEffect(async () => {
    if (!token) {
      setToken(localStorage.getItem('capstone-token'));
      return;
    }
    const data = await getUser(token);
    setUserData(data);
  }, [token]);

  return (
    <>
      <Switch>

        <Route exact path='/'>
          <h1>Home Page</h1>
        </Route>

        <Route exact path='/users'>
          <h1>Users Page</h1>
        </Route>

        {/* 404 */}
        <Route exact path='/404'>
          <h1>404 Page</h1>
        </Route>

        <Redirect from="/" to="/404"></Redirect>

      </Switch>
    </>
  );
}

export default App;
