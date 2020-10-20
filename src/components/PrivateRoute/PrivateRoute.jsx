import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useIsLogin } from '../AppContextProvider/AppContextProvider'

export const PrivateRoute = ({ children, ...rest }) => {
  const isLogin = useIsLogin()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
