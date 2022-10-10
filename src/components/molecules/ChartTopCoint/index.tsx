import Image from 'next/image';

import { ChartTopPointInterface } from 'src/interface/DashboardInterface';

import { IcDebio, IcKusama, IcMyriad, IcNear, IcPolkadot } from 'public/icons';

export default function ChartTopCoint({
  data,
}: {
  data: Array<ChartTopPointInterface>;
}) {
  const imageCoint = ({ name }: { name: string }) => {
    switch (name) {
      case 'polkadot':
        return IcPolkadot;
      case 'kusama':
        return IcKusama;
      case 'myria':
        return IcMyriad;
      case 'near':
        return IcNear;
      default:
        return IcDebio;
    }
  };

  const dataTotal = data
    .map((item) => {
      return item.decimal;
    })
    .reduce((partialSum: number, a: number) => partialSum + a, 0);

  return (
    <div className="grid gap-5 mt-6">
      {data.map((item, index) => {
        return (
          <div key={index} className="flex items-center">
            <Image
              alt={item.name}
              src={imageCoint({ name: item.name })}
              height={32}
              width={32}
            />
            <div
              className={`bg-[#CC42BE] h-6 rounded ml-2`}
              style={{ width: (item.decimal / dataTotal) * 100 + '%' }}
            />
            <div className="ml-2 text-[#616161] ">{item.decimal}</div>
          </div>
        );
      })}
    </div>
  );
}
