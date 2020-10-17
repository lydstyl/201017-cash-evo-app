import React, { useState, useEffect } from 'react'

import './App.css'
import { getAllAccounts } from '../../services/account'

import { Spinner } from '../Spinner/Spinner'
import { AccountCard } from '../AccountCard/AccountCard'

function App() {
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
    <div className='App'>
      <header className='App-header'>
        {response ? (
          <div class='accounts'>
            {/* <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(response, null, 4)}
            </pre> */}

            {response.map((r) => (
              <AccountCard key={r.id} account={r} />
            ))}
          </div>
        ) : (
          <Spinner />
        )}
      </header>
    </div>
  )
}

export default App
