import React, { useContext } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { Spinner } from '../Spinner/Spinner'
import { AddAccount } from '../AddAccount/AddAccount'
import { AccountCard } from '../AccountCard/AccountCard'

export const Home = () => {
  const appContext = useContext(AppContext)

  const { appState } = appContext

  return (
    <div className='home'>
      {appState.loading ? (
        <Spinner />
      ) : (
        <>
          {appState.accounts.length > 0 && (
            <>
              <AddAccount />

              <h2>Total : {appState.total}</h2>

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
  )
}
