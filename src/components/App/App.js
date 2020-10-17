import React, { useState, useEffect } from 'react'

import './App.css'
import { getAllUsers } from '../../services/user'

import { Spinner } from '../Spinner/Spinner'

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

        {/* <Spinner /> */}
      </header>
    </div>
  )
}

export default App
