import React from 'react'
import { Line } from 'react-chartjs-2'

import { options } from '../../utils/chartsOptions'

export const MainChart = () => {
  const data = {
    datasets: [
      {
        label: 'US Dates',
        data: [
          {
            x: '04/01/2014',
            y: 175,
          },
          {
            x: '10/01/2014',
            y: 175,
          },
          {
            x: '04/01/2015',
            y: 178,
          },
          {
            x: '10/01/2015',
            y: 178,
          },
        ],
        fill: false,
        borderColor: 'red',
      },
      {
        label: 'UK Dates',
        data: [
          {
            x: '01/04/2014',
            y: 175,
          },
          {
            x: '01/10/2014',
            y: 175,
          },
          {
            x: '01/04/2015',
            y: 178,
          },
          {
            x: '01/10/2015',
            y: 178,
          },
        ],
        fill: false,
        borderColor: 'blue',
      },
    ],
  }

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  )
}
