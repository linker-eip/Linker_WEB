import React from 'react'
import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from 'chart.js'
import '../../../CSS/CaGraph.scss'

interface Props {
  revenueData: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      fill: boolean
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }>
  }
}

const Graphics = ({ revenueData }: Props): JSX.Element => {
  Chart.register(CategoryScale)
  Chart.register(LinearScale)
  Chart.register(PointElement)
  Chart.register(LineElement)

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mois'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Chiffre d\'affaires (en €)'
        }
      }
    }
  }

  return (
      <div className='graph'>
        <Line data={revenueData} options={chartOptions} />
      </div>
  )
}

export default Graphics
