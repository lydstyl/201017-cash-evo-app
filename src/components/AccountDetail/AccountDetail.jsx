import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { AppContext } from '../App/App'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => a.id == id)

  let moments

  if (account) {
    moments = account.moments.map((m) => {
      return {
        amount: m.amount,

        createdAt: dayjs(m.createdAt, 'MM-DD-YYYY').format(
          'DD/MM/YYYY - HH:mm:ss'
        ),
      }
    })
  }

  return (
    <div>
      {account && <h1>{account.name}</h1>}

      <pre>{JSON.stringify(moments, null, 4)}</pre>
    </div>
  )
}
