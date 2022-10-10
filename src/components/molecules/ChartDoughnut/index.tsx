import { ConvertCamelCaseTitle } from 'src/utils/convertCamelCaseTitle';

import { Doughnut } from 'react-chartjs-2';

export default function ChartDoughnat({
  height,
  data,
}: {
  height: number;
  data: any;
}) {
  const dataPostPersentage = {
    labels: Object.keys(data)
      .filter((item) => item !== 'totalAll')
      .map((item) => {
        return ConvertCamelCaseTitle(item);
      }),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(data).filter((item) => item !== 'totalAll'),
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
  return (
    <Doughnut data={dataPostPersentage} options={optionsPie} height={height} />
  );
}
