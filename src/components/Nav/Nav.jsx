import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

export const Nav = () => {
  return (
    <header>
      <h1>Cash Vision</h1>
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
    </header>
  )
}
