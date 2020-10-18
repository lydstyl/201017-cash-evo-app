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
        amount: +m.amount,
        createdAt: m.createdAt,
        createdAtObj: new Date(m.createdAt),

        createdAtFr: dayjs(m.createdAt, 'MM-DD-YYYY').format(
          'DD/MM/YYYY - HH:mm:ss'
        ),

        timestampInSeconds: Math.floor(new Date(m.createdAt) / 1000),
      }
    })

    // const endTime = moments.slice(-1)[0].timestampInSeconds
    // const beginTime = moments[0].timestampInSeconds
  }

  return (
    <div>
      {account && <h1>{account.name}</h1>}

      <pre>{JSON.stringify(moments, null, 4)}</pre>
    </div>
  )
}
