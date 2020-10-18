import React, { useReducer, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import * as actionTypes from './actionTypes'
import { initialState, reducer } from './appReducer'
import { getAllAccounts } from '../../services/account'
import { Spinner } from '../Spinner/Spinner'
import { AddAccount } from '../AddAccount/AddAccount'
import { AccountCard } from '../AccountCard/AccountCard'
import { Nav } from '../Nav/Nav'
import { AccountDetail } from '../AccountDetail/AccountDetail'
import { MainChart } from '../MainChart/MainChart'

export const AppContext = React.createContext()

function App() {
  const [appState, appDispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    ;(async () => {
      try {
        appDispatch({ type: actionTypes.SET_LOADING, payload: true })

        const response = await getAllAccounts()

        const accounts = response.data

        appDispatch({ type: actionTypes.SET_ACCOUNTS, payload: accounts })

        appDispatch({ type: actionTypes.SET_TOTAL, payload: accounts })
      } catch (error) {
        console.log('App -> error', error)

        appDispatch({ type: actionTypes.SET_LOADING, payload: false })
      }
    })()
  }, [])

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      <Router>
        <Nav />

        <Switch>
          <Route path='/account/:id/detail'>
            <AccountDetail />
          </Route>

          <Route path='/main-chart'>
            <MainChart />
          </Route>

          <Route path='/'>
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
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  )
}

export default App
