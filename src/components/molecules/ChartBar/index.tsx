import React from 'react';

import {useWidth} from 'src/utils/calWidthScreen';

import {Bar} from 'react-chartjs-2';

export default function ChartBar() {
  const widthScreen = useWidth();
  const optionsUserGrowth = {
    responsive: false,
    plugins: {
      maintainAspectRatio: false,
      legend: {
        position: 'bottom' as const,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };
  const labels = [
    '11/07',
    '12/07',
    '13/07',
    '14/07',
    '15/07',
    '16/07',
    '17/07',
    '18/07',
    '19/07',
    '20/07',
  ];

  const dataUserGrowth = {
    labels,
    datasets: [
      {
        label: '',
        data: [2, 4, 34, 3, 5, 63, 21, 3, 35, 6],
        backgroundColor: '#9CCC42',
        borderRadius: 20,
        minBarLength: 24,
      },
    ],
  };
  return (
    <Bar
      options={optionsUserGrowth}
      data={dataUserGrowth}
      height={250}
      width={widthScreen === 'xl' ? 700 : widthScreen === 'lg' ? 500 : 450}
    />
  );
}
