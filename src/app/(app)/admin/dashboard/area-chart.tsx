import { colors } from '@/base/styles/colors';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import { data } from './dataset';

// Registering components and scales with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export function AreaChart() {
  const dataConfig: ChartData<'line'> = {
    datasets: [
      {
        data,
        fill: true,
        backgroundColor: 'rgba(231,231,253,0.6)',
        borderColor: colors.blue,
        tension: 0.3,
        datalabels: {
          display: false,
        },
      },
    ],
  };

  console.log(
    data
      .map((point: any) => ({
        x: point.normal,
        y: point.decimal,
      }))
      .sort((a: any, b: any) => (a.x < b.x ? -1 : 1)),
  );

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 75,
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

  return <Line height={300} data={dataConfig} options={options} />;
}
