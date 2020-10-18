import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'

import { AppContext } from '../App/App'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => a.id == id)

  return (
    <div>
      <pre>{JSON.stringify(account, null, 4)}</pre>
    </div>
  )
}
