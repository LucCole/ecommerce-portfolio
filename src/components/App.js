import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {

  return (
    <>
      <Switch>

        <Route exact path='/'>
          <h1>Home Page</h1>
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
