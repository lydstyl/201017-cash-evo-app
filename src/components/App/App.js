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

const calculateTotal = (accounts) => {
  let total = accounts.reduce((accumulator, currentValue) => {
    const amount = +currentValue.amount

    return accumulator + amount
  }, 0)

  return Math.round(total * 100) / 100
}

const initialState = {
  accounts: [],
  total: 0,
  loading: false,
}

const reducer = (state, action) => {
  const newState = { ...state }

  switch (action.type) {
    case actionTypes.SET_LOADING:
      newState.loading = action.payload

      return newState

    case actionTypes.SET_ACCOUNTS:
      newState.accounts = action.payload.map((a) => {
        a.amount = +a.amount
        return a
      })

      newState.total = changeTotal(newState)

      return newState

    case actionTypes.POST_ACCOUNT:
      newState.accounts.push(action.payload)

      newState.total = changeTotal(newState)

      newState.loading = false

      return newState

    case actionTypes.PUT_ACCOUNT:
      newState.accounts = newState.accounts.map((a) => {
        if (a.id === action.payload.id) {
          return { ...a, ...action.payload }
        }

        return a
      })

      newState.total = changeTotal(newState)

      newState.loading = false

      return newState

    case actionTypes.DELETE_ACCOUNT:
      newState.accounts = newState.accounts.filter(
        (a) => a.id !== action.payload
      )

      newState.total = changeTotal(newState)

      newState.loading = false

      return newState

    case actionTypes.SET_TOTAL:
      newState.total = action.payload

      newState.loading = false

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
        appDispatch({ type: actionTypes.SET_LOADING, payload: true })

        const response = await getAllAccounts()

        const accounts = response.data

        const total = calculateTotal(accounts)

        appDispatch({ type: actionTypes.SET_ACCOUNTS, payload: accounts })

        appDispatch({ type: actionTypes.SET_TOTAL, payload: total })
      } catch (error) {
        console.log('App -> error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    })()
  }, [])

  console.log('App -> appState.accounts', appState.accounts)

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      <div className='App'>
        {appState.loading ? (
          <Spinner />
        ) : (
          <>
            {appState.accounts.length > 0 && (
              <>
                <AddAccount />

                <h1>Total : {appState.total}</h1>

                <div className='accounts'>
                  {appState.accounts.map((r) => (
                    <AccountCard key={r.id} account={r} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App
