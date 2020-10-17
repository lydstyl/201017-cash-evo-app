import React, { useState, useEffect } from 'react'

import './App.css'
import { getAllAccounts } from '../../services/account'

import { Spinner } from '../Spinner/Spinner'
import { AddAccount } from '../AddAccount/AddAccount'
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
  )
}

export default App
