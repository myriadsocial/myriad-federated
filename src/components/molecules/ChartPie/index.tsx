import {ConvertCamelCaseTitle} from 'src/utils/convertCamelCaseTitle';

import {Pie} from 'react-chartjs-2';

export default function ChartPie({data}: {data: any}) {
  console.log(data);
  const dataPostPersentage = {
    labels: Object.keys(data)
      .filter(item => item !== 'totalAll')
      .map(item => {
        return ConvertCamelCaseTitle(item);
      }),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(data),
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
