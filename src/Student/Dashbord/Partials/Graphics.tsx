import React from 'react'
import { Line } from 'react-chartjs-2'
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from 'chart.js'
import '../../../CSS/CaGraph.scss'

const Graphics = (): JSX.Element => {
  Chart.register(CategoryScale)
  Chart.register(LinearScale)
  Chart.register(PointElement)
  Chart.register(LineElement)
  const revenueData = {
    labels: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ],
    datasets: [
      {
        label: 'Chiffre d\'affaires',
        data: [1000, 1500, 2000, 1800, 2200, 2500, 2800, 3000, 3200, 3500, 3800, 4000],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2
      }
    ]
  }

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
