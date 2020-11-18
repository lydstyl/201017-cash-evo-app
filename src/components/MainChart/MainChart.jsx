import React, { useContext, useState, useEffect } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { Line } from 'react-chartjs-2'
import { formatDate, options } from '../../utils/chartsOptions'

export const MainChart = () => {
  const appContext = useContext(AppContext)

  const [data, setData] = useState({})

  let {
    appState: { accounts }
  } = appContext

  useEffect(() => {
    mapDataForChart()

    const datasets = createDatasets()

    setData({ datasets })

    function mapDataForChart () {
      // eslint-disable-next-line
      accounts = accounts.map((a) => {
        return {
          name: a.name,
          moments: a.moments.map((m) => ({
            amount: m.amount,
            createdAt: formatDate(m.createdAt)
          }))
        }
      })
    }

    function createDatasets () {
      const datasets = []

      accounts.forEach((a) => {
        datasets.push({
          label: a.name,
          data: a.moments.map((m) => ({ x: m.createdAt, y: m.amount })),
          fill: false,
          borderColor: '#00F'
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
