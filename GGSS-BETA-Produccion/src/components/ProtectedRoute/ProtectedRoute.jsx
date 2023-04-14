import React from 'react'
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token !== null;
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute