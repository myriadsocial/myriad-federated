import Image from 'next/image';
import React from 'react';

interface CardTotalInterface {
  image: string;
  count: string;
  label: string;
}
export default function CardTotal(props: CardTotalInterface) {
  const {image, count, label} = props;
  return (
    <div className="p-5 bg-white shadow-lg rounded-2xl flex">
      <Image src={image} alt="total user" />
      <div className="ml-4">
        <div className="text-[34px] font-semibold">{count}</div>
        <div className="text-sm text-[#616161]">{label}</div>
      </div>
    </div>
  );
}
