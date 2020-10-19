import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { formatDate, options } from '../../utils/chartsOptions'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => +a.id === +id)

  const data = {}

  const chartData = {
    datasets: [
      {
        label: 'Montant',
        data: [],

        fill: false,
        borderColor: 'black',
        // backgroundColor: 'rgba(255,255,255,0',
      },
    ],
  }

  const mapMoments = () => {
    data.moments = account.moments.map((m) => {
      return {
        amount: +m.amount,
        createdAt: new Date(m.createdAt),

        createdAtFr: formatDate(m.createdAt),

        timestampInSeconds: Math.floor(new Date(m.createdAt) / 1000),
      }
    })
  }

  const createChartData = () => {
    data.moments.forEach((m) => {
      chartData.datasets[0].data.push({ x: m.createdAtFr, y: +m.amount })
    })
  }

  if (account) {
    mapMoments()

    createChartData()
  }

  return (
    <div>
      {account && <h2>{account.name}</h2>}
      <Line data={chartData} options={options} />
    </div>
  )
}
