import React from 'react';

import Image from 'next/image';

interface ListMedianInterface {
  image: string;
  count: string;
  title: string;
}
export default function ListMedian(props: ListMedianInterface) {
  const {image, count, title} = props;
  return (
    <div className="flex items-center">
      <Image alt="" src={image} className="h-6 w-6" />
      <div className="ml-[6px]">
        <div className="text-base text-black">{title}</div>
        <div className="text-[34px] mt-1">{count}</div>
      </div>
    </div>
  );
}
