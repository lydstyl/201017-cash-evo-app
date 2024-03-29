import dayjs from "dayjs"

export const dateFormat = "DD/MM/YYYY - HH:mm:ss"

export function formatDate(date) {
    return dayjs(date).format(dateFormat)
}

export const options = {
    responsive: true,
    title: {
        display: false,
        text: "Chart.js Time Scale",
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: dateFormat,
                    tooltipFormat: "ll",
                },
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                },
            },
        ],
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: "montant",
                },
            },
        ],
    },
}
