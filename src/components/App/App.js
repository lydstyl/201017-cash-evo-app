import React, { useState, useEffect } from 'react'

import logo from './logo.svg'
import './App.css'
import { getAllUsers } from '../../services/user'

function App() {
  const [response, setResponse] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getAllUsers()

        setResponse(data)
      } catch (error) {
        console.log('App -> error', error)
      }
    })()
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        {response && (
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(response, null, 4)}
          </pre>
        )}

        <img src={logo} className='App-logo' alt='logo' />
      </header>
    </div>
  )
}

export default App
