import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotIndex from './components/Spots/SpotIndex';
import SpotDetail from './components/Spots/SpotDetail';
import CreateSpotForm from "./components/Spots/CreateSpotForm";
import EditSpotForm from "./components/Spots/EditSpotForm";
import ManageSpots from "./components/Spots/ManageSpots";

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
            <CreateSpotForm />
          </Route>
          <Route path='/spots/current'>
            <ManageSpots />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
