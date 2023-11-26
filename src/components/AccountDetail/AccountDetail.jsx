import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { AppContext } from "../AppContextProvider/AppContextProvider"
import { formatDate } from "../../utils/chartsOptions"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const AccountDetail = () => {
    const appContext = useContext(AppContext)

    const { id } = useParams()

    const account = appContext.appState.accounts.find(a => +a.id === +id)

    if (!account) {
        return <>Loading...</>
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top", // as const,
            },
            // title: {
            //     display: true,
            //     text: "Chart.js Line Chart",
            // },
        },
    }

    const xData = account.moments.map(moment => formatDate(moment.createdAt))
    const yData = account.moments.map(moment => moment.amount)

    const data = {
        labels: xData,
        datasets: [
            {
                label: "Dataset 1",
                data: yData,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    }

    return (
        <div>
            <h2>{account.name}</h2>
            <Line options={options} data={data} />
        </div>
    )
}
