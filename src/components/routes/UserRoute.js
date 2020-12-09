import React from "react";
import { Route, Link } from "react-router-dom";

//we have to access user in state
import { useSelector } from "react-redux";


import LoadingToRedirect from './LoadingToRedirect';

//children props and rest of the props
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  
  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
   <LoadingToRedirect />
  );
};

export default UserRoute;
