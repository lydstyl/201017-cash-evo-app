import React, { useContext, useState, useEffect } from 'react'

import { AppContext } from '../AppContextProvider/AppContextProvider'
import { Line } from 'react-chartjs-2'
import { formatDate, options } from '../../utils/chartsOptions'

export const SumChart = () => {
  const appContext = useContext(AppContext)

  const [data, setData] = useState({})

  let {
    appState: { accounts },
  } = appContext

  useEffect(() => {
    const allMoments = getAllMoments(accounts)

    const minAndMaxDates = getMinAndMaxDates(allMoments)

    const globalMoments = getGlobalMoments(minAndMaxDates)

    const datasetData = getDatasetData(globalMoments)

    const dataSet = getDataSet(datasetData)

    const chartData = getChartData(dataSet)

    setData(chartData)

    function getAllMoments(accounts) {
      let allMoments = []

      accounts.forEach((a) => {
        allMoments = [
          ...allMoments,
          ...a.moments.map((m) => ({
            name: a.name, // todo remove this
            date: new Date(m.createdAt),
            amount: m.amount,

            createdAt: formatDate(m.createdAt),
          })),
        ]

        return a
      })

      allMoments = allMoments.sort((a, b) => {
        if (a.date > b.date) {
          return 1
        } else {
          return -1
        }
      })

      return allMoments
    }

    function getMinAndMaxDates(allMoments) {
      if (allMoments.length) {
        const minAndMaxDates = []
        const firstMoment = allMoments[0]
        firstMoment.amount = +firstMoment.amount

        const lastMoment = allMoments.slice(-1)[0]
        lastMoment.amount = +lastMoment.amount

        minAndMaxDates.push(firstMoment, lastMoment)

        return minAndMaxDates
      } else {
        return [undefined, undefined]
      }
    }

    function getGlobalMoments(minAndMaxDates) {
      if (minAndMaxDates[0]) {
        const totalNumberOfDates = 4 // if we whant 10 dates --> min, max and 8 in between

        const inBetweenDates = getInBetweenDates()

        const globalMoments = [
          minAndMaxDates[0],
          ...inBetweenDates,
          minAndMaxDates[1],
        ]

        return globalMoments

        function getTimeBetweenEveryDates() {
          const maxMinDateDiff = Math.abs(
            minAndMaxDates[1].date - minAndMaxDates[0].date
          ) // in milliseconds

          const timeBetweenEveryDates = maxMinDateDiff / totalNumberOfDates // in milliseconds
          return timeBetweenEveryDates
        }

        function getInBetweenDates() {
          const inBetweenDates = []
          for (let i = 0; i < totalNumberOfDates - 2; i++) {
            const timeToAdd = getTimeBetweenEveryDates() * (i + 1)

            const dateValue = new Date(getFirstDate() + timeToAdd) // I hope this is correct

            const inBetweendate = {
              name: '',
              date: dateValue,
              amount: +'0.00',
              createdAt: formatDate(dateValue),
            }

            inBetweenDates.push(inBetweendate)
          }

          return inBetweenDates
        }

        function getFirstDate() {
          let firstDate = minAndMaxDates[0].date

          firstDate = firstDate.getTime()

          return firstDate
        }
      }
    }

    function getDatasetData(data) {
      if (data) {
        data = data.map((d) => ({
          x: d.createdAt,
          y: d.amount,
        }))

        return data
      } else {
        return []
      }
    }

    function getDataSet(data) {
      const dataSet = {
        label: 'Somme de tous les comptes',
        data,
      }

      return dataSet
    }

    function getChartData(dataSet) {
      const chartData = {
        datasets: [dataSet],
      }

      console.log('xxxxxxxx', JSON.stringify(chartData, null, 4))

      return chartData
    }
  }, [accounts])

  return (
    <div>
      <Line data={data} options={options} />

      <pre>
        {JSON.stringify(
          {
            datasets: [
              {
                label: 'ING',
                data: [
                  {
                    x: '17/10/2020 - 21:16:15',
                    y: '300.00',
                  },
                  {
                    x: '17/10/2020 - 21:16:30',
                    y: '400.00',
                  },
                ],
                fill: false,
                borderColor: '#00F',
              },
            ],
          },

          null,

          4
        )}
      </pre>

      <pre>{JSON.stringify(accounts, null, 4)}</pre>
    </div>
  )
}
