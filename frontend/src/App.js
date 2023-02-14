import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from './components/Spots/SpotIndex'
import SpotDetail from './components/Spots/SpotDetail'
import SpotForm from "./components/Spots/SpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SpotIndex />
          </Route>
          <Route exact path='/spots/new'>
            <SpotForm />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
