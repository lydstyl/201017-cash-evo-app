import React from 'react'

export const DoughnutChart = ({ data }) => {
  return (
    <div>
      <h2>
        DoughnutChart
      </h2>

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  )
}
