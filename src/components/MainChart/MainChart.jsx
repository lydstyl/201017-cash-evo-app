import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "../AppContextProvider/AppContextProvider"
import { Line } from "react-chartjs-2"
import { formatDate } from "../../utils/chartsOptions"
import { getRandomColor } from "../../utils/getRandomColor"

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top", // as const,
        },
    },
}

function getAllSortedMoments(accounts) {
    const allMoments = []
    accounts.forEach(account => {
        account.moments.forEach(moment => {
            allMoments.push({
                accountId: account.id,
                accountName: account.name,
                xDate: moment.createdAt,
                yAmount: moment.amount,
            })
        })
    })
    allMoments.sort((a, b) => {
        if (a.xDate > b.xDate) {
            return 1
        }
        return -1
    })

    return allMoments
}

function getXDates(sortedMoments) {
    return sortedMoments.map(moment => formatDate(moment.xDate))
}

function getSets(sortedMoments, accountsIds) {
    const sets = []
    accountsIds.forEach(id => {
        const set = {
            label: id,
            data: [],
            borderColor: getRandomColor(),
        }

        sortedMoments.forEach(moment => {
            if (moment.accountId === id) {
                if (typeof set.label === "number") {
                    set.label = moment.accountName // change id to name
                }

                set.data.push(moment.yAmount)
            } else {
                set.data.push(null)
            }
        })

        sets.push(set)
    })

    return sets
}

function getAccountsIds(sortedMoments) {
    const ids = []
    sortedMoments.forEach(moment => {
        if (!ids.includes(moment.accountId)) {
            ids.push(moment.accountId)
        }
    })
    return ids
}

function createData(xDates, sets, options) {
    const data = {
        labels: xDates,
        datasets: sets,
        options,
    }

    return data
}

export const MainChart = () => {
    const appContext = useContext(AppContext)

    const [data, setData] = useState(null)

    let {
        appState: { accounts },
    } = appContext

    useEffect(() => {
        const sortedMoments = getAllSortedMoments(accounts)
        const xDates = getXDates(sortedMoments)
        const accountsIds = getAccountsIds(sortedMoments)
        const sets = getSets(sortedMoments, accountsIds)

        const data = createData(xDates, sets, options)

        setData(data)
    }, [accounts])

    if (!data) {
        return <>Loading...</>
    }

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    )
}
