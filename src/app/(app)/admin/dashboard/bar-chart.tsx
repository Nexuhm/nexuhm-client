import React from 'react';
import {
  ChartData,
  ChartOptions,
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export function HorizontalBarChart() {
  const data: ChartData<'bar'> = {
    labels: [
      'Job 1',
      'Job 2',
      'Job 3',
      'Job 4',
      'Job 5',
      'Job 6',
      'Job 7',
      'Job 8',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [12, 19, 13, 15, 12, 14, 18, 17],
        backgroundColor: [
          'rgba(30, 116, 205, 1)',
          'rgba(30, 116, 205, .9)',
          'rgba(30, 116, 205, .8)',
          'rgba(30, 116, 205, .7)',
          'rgba(30, 116, 205, .6)',
          'rgba(30, 116, 205, .5)',
          'rgba(25, 25, 25, .3)',
          'rgba(25, 25, 25, .2)',
        ],
        borderWidth: 0,
        borderRadius: 4,
        datalabels: {
          anchor: 'end',
          align: 'start',
          color: '#fff',
          formatter: (value, context) => {
            // Customize the label text
            return `Jobs ${value}`;
          },
        },
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Bar data={data} options={options} height={340} />;
}
