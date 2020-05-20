import React, { useState, useEffect } from 'react';
import './App.css';
import AuthService from './api/authService';
import { Switch, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Loader from './components/Loader';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import HigherOrder from './pages/HigherOrder';
import useGetUser from './api/hooks/useGetUser';
const authService = new AuthService();

export default function App() {
  const [state, setState] = useState({ user: null });

  const { loading, user, err } = useGetUser();

  console.log(loading, user, err);

  //Component did mount is now use effect.
  //Don't forget the second argument needs to be an empty array, so app won't get into an infinite loop.

  const setUserState = (user) => {
    // If user is loggedIn state will be set with user,
    // otherwise user will be null.
    setState({ user, isLoadingUser: false });
  };

  const logout = async () => {
    //destroy session.
    try {
      await authService.logout();
    } catch (err) {
      console.log(err);
    } finally {
      setUserState(null);
    }
  };

  // Initially we do not know yet whether an user is logged in or not so we just return a loader.
  if (loading) return <Loader className="full-screen-loader" />;
  return (
    <div className="App">
      <NavBar user={user} logout={logout} />
      <Switch>
        <Route exact path="/" component={HigherOrder} />
        <Route
          path="/login"
          render={(props) => <Login {...props} setUserState={setUserState} />}
        />
        <Route
          path="/register"
          render={(props) => (
            <Register {...props} setUserState={setUserState} />
          )}
        />
        <PrivateRoute
          path="/profile"
          user={user}
          setUserState={setUserState}
          component={Profile}
        />
      </Switch>
    </div>
  );
}
