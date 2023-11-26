import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "../AppContextProvider/AppContextProvider"
import { Line } from "react-chartjs-2"
import { formatDate } from "../../utils/chartsOptions"

function getRandomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const MainChart = () => {
    const appContext = useContext(AppContext)

    const [data, setData] = useState(null)

    let {
        appState: { accounts },
    } = appContext

    useEffect(() => {
        mapDataForChart()

        const data = createData()

        setData(data)

        function mapDataForChart() {
            // eslint-disable-next-line
            accounts = accounts.map(a => {
                return {
                    name: a.name,
                    moments: a.moments.map(m => ({
                        amount: m.amount,
                        createdAt: formatDate(m.createdAt),
                    })),
                }
            })
        }

        function createData() {
            const labels = []
            const datasets = []

            accounts.forEach(account => {
                const xData = account.moments.map(moment => moment.createdAt)
                labels.push(...xData)

                const yData = account.moments.map(moment => moment.amount)

                datasets.push({
                    label: account.name,
                    data: yData,

                    borderColor: getRandomColor(),
                })
            })

            const data = {
                labels,
                datasets,
            }

            return data
        }
    }, [accounts])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top", // as const,
            },
        },
    }

    if (!data) {
        return <>Loading...</>
    }

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}
