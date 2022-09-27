import React from 'react';

import Image from 'next/image';

import {IcDebio, IcKusama, IcMyriad, IcNear, IcPolkadot} from 'public/icons';

export default function ChartTopCoint() {
  const dataTopCoint = [
    {
      image: IcKusama,
      coint: 10,
    },
    {
      image: IcPolkadot,
      coint: 10,
    },
    {
      image: IcNear,
      coint: 30,
    },
    {
      image: IcMyriad,
      coint: 40,
    },
    {
      image: IcDebio,
      coint: 10,
    },
  ];
  return (
    <div className="grid gap-5 mt-6">
      {dataTopCoint
        .sort((a, b) => b.coint - a.coint)
        .map((item, index) => {
          return (
            <div key={index} className="flex items-center">
              <Image alt={item.image} src={item.image} height={32} width={32} />
              <div
                className={`bg-[#CC42BE] h-6 rounded ml-2`}
                style={{width: (item.coint / 100) * 100 + '%'}}
              />
              <div className="ml-2 text-[#616161] ">{item.coint}</div>
            </div>
          );
        })}
    </div>
  );
}
