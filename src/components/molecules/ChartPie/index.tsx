import React from 'react';

import {Pie} from 'react-chartjs-2';

export default function ChartPie() {
  const dataPostPersentage = {
    labels: ['Myriad post', 'Import Twitter post', 'Import Reddit post'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['#7342CC', '#FFC857', '#9CCC42'],
        borderWidth: 1,
      },
    ],
  };

  const optionsPie = {
    responsive: false,
    plugins: {
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          boxHeight: 12,
        },
      },
    },
  };
  return <Pie data={dataPostPersentage} options={optionsPie} height={175} />;
}
