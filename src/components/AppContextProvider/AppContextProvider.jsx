import React, { useContext, useReducer, useEffect } from 'react'

import { initialState, reducer } from '../App/appReducer'
import * as actionTypes from '../App/actionTypes'
import { getAllAccounts } from '../../services/account'

export const AppContext = React.createContext()

export const useIsLogin = () => {
  const appContext = useContext(AppContext)

  return appContext.appState.isLogin
}

export const AppContextProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    ;(async () => {
      try {
        appDispatch({ type: actionTypes.SET_LOADING, payload: true })

        let response = {}
        if (appState.isLogin) {
          response = await getAllAccounts()

          const accounts = response.data

          appDispatch({ type: actionTypes.SET_ACCOUNTS, payload: accounts })
        } else {
          appDispatch({ type: actionTypes.SET_LOADING, payload: false })
        }
      } catch (error) {
        console.log('App -> error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    })()
  }, [appState.isLogin])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  )
}
