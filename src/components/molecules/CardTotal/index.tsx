import React from 'react';
import CountUp from 'react-countup';

import Image from 'next/image';

interface CardTotalInterface {
  image: string;
  count: number;
  label: string;
}
export default function CardTotal(props: CardTotalInterface) {
  const {image, count, label} = props;
  return (
    <div className="p-5 bg-white shadow-lg rounded-2xl flex">
      <Image src={image} alt="total user" />
      <div className="ml-4">
        <div className="text-[34px] font-semibold">
          <CountUp start={0} end={count} separator="," />
        </div>
        <div className="text-sm text-[#616161]">{label}</div>
      </div>
    </div>
  );
}
