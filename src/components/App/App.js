import React, { useReducer, useEffect } from 'react'

import './App.css'
import { getAllAccounts } from '../../services/account'

import { Spinner } from '../Spinner/Spinner'
import { AddAccount } from '../AddAccount/AddAccount'
import { AccountCard } from '../AccountCard/AccountCard'

import * as actionTypes from './actionTypes'

const changeTotal = (newState) => {
  const newTotal = 0

  return newTotal
}

const initialState = {
  accounts: [],
  total: 0,
}

const reducer = (state, action) => {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_ACCOUNTS:
      newState.accounts = action.payload

      newState.total = changeTotal(newState)

      return newState

    case actionTypes.POST_ACCOUNT:
      newState.accounts.push(action.payload)

      newState.total = changeTotal(newState)

      return newState

    case actionTypes.PUT_ACCOUNT:
      newState.accounts = newState.accounts.map((a) => {
        if (a.id === action.payload.id) {
          return { ...a, ...action.payload }
        }

        return a
      })

      newState.total = changeTotal(newState)

      return newState

    case actionTypes.DELETE_ACCOUNT:
      newState.accounts = newState.accounts.filter(
        (a) => a.id !== action.payload
      )

      newState.total = changeTotal(newState)

      return newState

    default:
      return state
  }
}

export const AppContext = React.createContext()

function App() {
  const [appState, appDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getAllAccounts()

        const accounts = response.data

        appDispatch({ type: actionTypes.SET_ACCOUNTS, payload: accounts })
      } catch (error) {
        console.log('App -> error', error)
      }
    })()
  }, [])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      <div className='App'>
        {appState.accounts.length ? (
          <>
            <AddAccount />

            <div className='accounts'>
              {appState.accounts.map((r) => (
                <AccountCard key={r.id} account={r} />
              ))}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
