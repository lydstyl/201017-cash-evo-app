import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { Line } from 'react-chartjs-2'

import { AppContext } from '../App/App'

export const AccountDetail = () => {
  const appContext = useContext(AppContext)

  const { id } = useParams()

  const account = appContext.appState.accounts.find((a) => +a.id === +id)

  const format = 'DD/MM/YYYY - HH:mm:ss'

  const options = {
    responsive: true,
    title: {
      display: true,
      text: 'Chart.js Time Scale',
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            format: format,
            tooltipFormat: 'll',
          },
          scaleLabel: {
            display: true,
            labelString: 'Date',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'value',
          },
        },
      ],
    },
  }

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

        createdAtFr: dayjs(m.createdAt, 'MM-DD-YYYY').format(format),

        timestampInSeconds: Math.floor(new Date(m.createdAt) / 1000),
      }
    })
  }

  const createChartData = () => {
    data.moments.forEach((m) => {
      chartData.datasets[0].data.push({ x: m.createdAtFr, y: +m.amount })
    })
  }
  console.log('createChartData -> chartData', chartData)

  if (account) {
    mapMoments()

    createChartData()
  }

  return (
    <div>
      {account && <h2>{account.name}</h2>}

      <Line data={chartData} options={options} />

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
