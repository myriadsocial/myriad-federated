import {MetricInterface} from 'src/interface/ServerListInterface';

import {Doughnut} from 'react-chartjs-2';

export default function ChartDoughnat({
  height,
  data,
}: {
  height: number;
  data: MetricInterface | undefined;
}) {
  const dataPostPersentage = {
    labels: ['Myriad post', 'Import Twitter post', 'Import Reddit post'],
    datasets: [
      {
        label: '# of Votes',
        data: [data?.totalMyriad, data?.totalTwitter, data?.totalReddit],
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
  return <Doughnut data={dataPostPersentage} options={optionsPie} height={height} />;
}
