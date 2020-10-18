import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { Line } from 'react-chartjs-2'

import { AppContext } from '../App/App'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => +a.id === +id)

  const data = {}

  const chartData = {
    labels: [],
    datasets: [
      {
        label: 'Montant',
        data: [],

        backgroundColor: 'rgba(255,255,255,0',
        borderColor: 'black',
        // borderWidth: 2,
      },
    ],
  }

  const mapMoments = () => {
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
  }

  const addEndAndBeginTime = () => {
    data.endTime = data.moments.slice(-1)[0].timestampInSeconds
    data.beginTime = data.moments[0].timestampInSeconds
  }

  const createChartData = () => {
    data.moments.forEach((m) => {
      chartData.labels.push(m.createdAtFr)

      chartData.datasets[0].data.push(m.amount)
    })
  }

  if (account) {
    mapMoments()

    addEndAndBeginTime()

    createChartData()
  }

  return (
    <div>
      {account && <h2>{account.name}</h2>}

      <Line data={chartData} />

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
