export const dateFormat = 'DD/MM/YYYY - HH:mm:ss'

export const options = {
  responsive: true,
  title: {
    display: true,
    text: 'Chart.js Time Scale',
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: dateFormat,
          tooltipFormat: 'll',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'value',
        },
      },
    ],
  },
}
