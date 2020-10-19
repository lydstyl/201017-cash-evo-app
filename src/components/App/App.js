import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AppContextProvider } from '../AppContextProvider/AppContextProvider'
import { Nav } from '../Nav/Nav'
import { Home } from '../Home/Home'
import { AccountDetail } from '../AccountDetail/AccountDetail'
import { SumChart } from '../SumChart/SumChart'
import { MainChart } from '../MainChart/MainChart'

import './App.css'

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Nav />

        <Switch>
          <Route path='/account/:id/:name'>
            <AccountDetail />
          </Route>

          <Route path='/sum-chart'>
            <SumChart />
          </Route>

          <Route path='/comparison-graph'>
            <MainChart />
          </Route>

          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </AppContextProvider>
  )
}

export default App
