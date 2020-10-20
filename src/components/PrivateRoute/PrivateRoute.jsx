import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AppContext } from '../AppContextProvider/AppContextProvider'

export const PrivateRoute = ({ children, ...rest }) => {
  const appContext = useContext(AppContext)

  const { isLogin } = appContext.appState

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
