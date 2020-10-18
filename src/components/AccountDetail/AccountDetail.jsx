import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { Bar } from 'react-chartjs-2'

import { AppContext } from '../App/App'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => a.id == id)

  const data = {}

  if (account) {
    data.moments = account.moments.map((m) => {
      return {
        amount: +m.amount,
        createdAt: new Date(m.createdAt),

        createdAtFr: dayjs(m.createdAt, 'MM-DD-YYYY').format(
          'DD/MM/YYYY - HH:mm:ss'
        ),

        timestampInSeconds: Math.floor(new Date(m.createdAt) / 1000),
      }
    })

    data.endTime = data.moments.slice(-1)[0].timestampInSeconds
    data.beginTime = data.moments[0].timestampInSeconds
  }

  const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],

    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div>
      {account && <h1>{account.name}</h1>}

      <Bar data={chartData} />

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
