import React, { useContext, useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { Line } from 'react-chartjs-2'
import { dateFormat, options } from '../../utils/chartsOptions'

export const MainChart = () => {
  const appContext = useContext(AppContext)

  const [data, setData] = useState({})

  let {
    appState: { accounts },
  } = appContext

  console.log('MainChart -> data', data)

  console.log('MainChart -> accounts', accounts)

  useEffect(() => {
    mapDataForChart()

    const datasets = createDatasets()

    setData({ datasets })

    function mapDataForChart() {
      accounts = accounts.map((a) => {
        return {
          name: a.name,
          moments: a.moments.map((m) => ({
            amount: m.amount,
            createdAt: dayjs(m.createdAt, 'MM-DD-YYYY').format(dateFormat),
          })),
        }
      })
    }

    function createDatasets() {
      const datasets = []

      accounts.forEach((a) => {
        datasets.push({
          label: a.name,
          data: a.moments.map((m) => ({ x: m.createdAt, y: m.amount })),
          fill: false,
          borderColor: 'black',
        })
      })

      return datasets
    }
  }, [accounts])

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  )
}

// se connectrer chopseer les doinnees

// maper les données pour le chart
