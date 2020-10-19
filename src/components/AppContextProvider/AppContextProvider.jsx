import React, { useReducer, useEffect } from 'react'

import { initialState, reducer } from '../App/appReducer'
import * as actionTypes from '../App/actionTypes'
import { getAllAccounts } from '../../services/account'

export const AppContext = React.createContext()

export const AppContextProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    ;(async () => {
      try {
        appDispatch({ type: actionTypes.SET_LOADING, payload: true })

        const response = await getAllAccounts()

        const accounts = response.data

        appDispatch({ type: actionTypes.SET_ACCOUNTS, payload: accounts })
      } catch (error) {
        console.log('App -> error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    })()
  }, [])

  // useEffect(() => {
  //   console.log('AppContextProvider -> appState', appState)
  // }, [appState])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  )
}
