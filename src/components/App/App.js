import React, { useReducer, useState, useEffect } from 'react'

import './App.css'
import { getAllAccounts } from '../../services/account'

import { Spinner } from '../Spinner/Spinner'
import { AddAccount } from '../AddAccount/AddAccount'
import { AccountCard } from '../AccountCard/AccountCard'

import * as actionTypes from './actionTypes'

const initialState = {
  accounts: [],
  total: 0,
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.POST_ACCOUNT:
      return { ...state, accounts: state.accounts.push(action.payload) }

    default:
      return state
  }
}

export const AccountContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const [response, setResponse] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getAllAccounts()

        setResponse(response.data)
      } catch (error) {
        console.log('App -> error', error)
      }
    })()
  }, [])

  return (
    <AccountContext.Provider
      value={{ accountState: state, countDispatch: dispatch }}
    >
      <div className='App'>
        {response ? (
          <>
            <AddAccount />

            <div className='accounts'>
              {/* <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(response, null, 4)}
            </pre> */}

              {response.map((r) => (
                <AccountCard key={r.id} account={r} />
              ))}
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </AccountContext.Provider>
  )
}

export default App
