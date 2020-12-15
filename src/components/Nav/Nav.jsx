import React, { useContext } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { Spinner } from '../Spinner/Spinner'
import { Link } from 'react-router-dom'

import './Nav.css'

export const Nav = () => {
  const appContext = useContext(AppContext)

  const { appState } = appContext

  return (
    <header>
      <h1>Cash Vision</h1>

      {appState.loading
        ? (
          <Spinner />
          )
        : (
          <>
            {appState.accounts && (
              <nav>
                <ul>
                  <li>
                    <Link to='/'>Home</Link>
                  </li>
                  <li>
                    <Link to='/sum-chart'>Graphique somme totale</Link>
                  </li>
                  <li>
                    <Link to='/comparison-graph'>Graphique comparatif</Link>
                  </li>
                </ul>
              </nav>
            )}
          </>
          )}

    </header>
  )
}
