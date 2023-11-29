import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../AppContextProvider/AppContextProvider'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getRandomColor } from '../../utils/getRandomColor'

ChartJS.register(ArcElement, Tooltip, Legend)

export const DoughnutPage = () => {
  const appContext = useContext(AppContext)
  const [data, setData] = useState(null)

  const {
    appState: { accounts }
  } = appContext

  useEffect(() => {
    console.log('🚀 ~ file: Doughnut.jsx:22 ~ total ~ accounts:', accounts)
    const total = accounts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount
    }, 0)

    const labels = []
    const amounts = []
    const backgroundColors = []
    accounts.forEach((account) => {
      labels.push(
        `${((account.amount * 100) / total).toFixed(1)}% ${account.name}`
      )
      amounts.push(account.amount)
      backgroundColors.push(getRandomColor())
    })

    const data = {
      labels,
      datasets: [
        {
          label: 'montant',
          data: amounts,
          backgroundColor: backgroundColors
        }
      ]
    }

    setData(data)
  }, [accounts])

  if (!data) {
    return <>Loading...</>
  }

  return <Doughnut data={data} options={{ cutout: 500, radius: 500 }} />
}
