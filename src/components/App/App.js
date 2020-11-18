import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from '../AppContextProvider/AppContextProvider'
import { Nav } from '../Nav/Nav'
import { Login } from '../Login/Login'
import { PrivateRoute } from '../PrivateRoute/PrivateRoute'
import { Home } from '../Home/Home'
import { AccountDetail } from '../AccountDetail/AccountDetail'
import { SumChart } from '../SumChart/SumChart'
import { MainChart } from '../MainChart/MainChart'

import './App.css'

function App () {
  return (
    <AppContextProvider>
      <Router>
        <Nav />
        <Switch>
          <Route path='/login' component={Login} />

          <PrivateRoute path='/account/:id/:name'>
            <AccountDetail />
          </PrivateRoute>

          <PrivateRoute path='/sum-chart'>
            <SumChart />
          </PrivateRoute>

          <PrivateRoute path='/comparison-graph'>
            <MainChart />
          </PrivateRoute>

          <PrivateRoute path='/'>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </AppContextProvider>
  )
}

export default App
