import Image from 'next/image';
import { useRouter } from 'next/router';
import { title } from 'process';
import { ReactNode } from 'react';
import { ServerDetail } from 'src/interface/ServerListInterface';

import { ExperianceGray, PostGray, UserGray } from '../../../../public/icons';
import Button from '../Button';

const CardStaked = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const router = useRouter();
  return (
    <div className="bg-white mr-6 rounded-[10px] border border-softGray2 flex flex-col">
      <div className="border-b border-softGray2 px-5 py-2 text-[14px] text-darkGray">
        {title}
      </div>
      {children}
    </div>
  );
};

export default CardStaked;
