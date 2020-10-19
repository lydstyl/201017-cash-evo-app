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

    const globalMoments = prepareGlobalMoments(minAndMaxDates) // or name could have been prepareDatasetData

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
      const minAndMaxDates = []

      const firstMoment = allMoments[0]

      const lastMoment = allMoments.slice(-1)[0]

      minAndMaxDates.push(firstMoment, lastMoment)

      return minAndMaxDates
    }

    function prepareGlobalMoments(minAndMaxDates) {
      if (minAndMaxDates[0]) {
        const totalNumberOfDates = 10 // if we whant 10 dates --> min, max and 8 in between

        const maxMinDateDiff = Math.abs(
          minAndMaxDates[1].date - minAndMaxDates[0].date
        ) // in milliseconds

        const timeBetweenEveryDates = maxMinDateDiff / totalNumberOfDates // in milliseconds

        let firstDate = minAndMaxDates[0].date
        firstDate = firstDate.getTime()

        // const checkFirstDate = new Date(firstDate)
        // console.log('prepareGlobalMoments -> checkFirstDate ', checkFirstDate)

        const inBetweenDates = []
        for (let i = 0; i < totalNumberOfDates - 2; i++) {
          const timeToAdd = timeBetweenEveryDates * (i + 1)

          const dateValue = new Date(firstDate + timeToAdd) // I hope this is correct

          const inBetweendate = {
            name: '',
            date: dateValue,
            amount: '0.00',
            createdAt: formatDate(dateValue),
          }

          inBetweenDates.push(inBetweendate)
        }
        const globalMoments = [
          minAndMaxDates[0],
          ...inBetweenDates,
          minAndMaxDates[1],
        ]

        console.log(
          'prepareGlobalMoments -> globalMoments',
          JSON.stringify(globalMoments, null, 4)
        )
        return globalMoments
      }
    }
  }, [accounts])

  return (
    <div>
      {/* <Line data={data} options={options} /> */}

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
