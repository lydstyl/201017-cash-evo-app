import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [response, setResponse] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const scheme = 'https'
        const authority = 'cash-evo-api.herokuapp.com' // or host here
        const path = '/api/v1/users'

        const response = await fetch(`${scheme}://${authority}${path}`)

        const data = await response.json()

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
