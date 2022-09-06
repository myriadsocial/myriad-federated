import React from 'react';
import Image from 'next/image';

import {Skeleton} from '@mui/material';
import {ExperianceGray, PostGray, UserGray} from 'public/icons';

export const ShimerComponent: React.FC = () => {
  return (
    <button className="bg-white flex py-5 px-9 rounded-[10px] w-full mt-4 shadow-md">
      <Skeleton variant="rectangular" width={80} height={80} style={{borderRadius: 10}} />
      {/* <div className="h-[80px] w-[80px] rounded-[5px] bg-slate-400"></div> */}

      <div className="ml-4">
        <div>
          <div className="text-2xl text-primary text-left">
            <Skeleton variant="text" width={390} height={25} style={{borderRadius: 10}} />
          </div>
          <div className="text-sm text-darkGray text-left">
            <Skeleton variant="text" width={390} height={25} style={{borderRadius: 10}} />
          </div>
          <div className="text-base text-left">
            <Skeleton variant="text" width={390} height={25} style={{borderRadius: 10}} />
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex">
            <Image src={UserGray} height={20} width={20} alt="" />
            <div className="mx-2">
              <div className="text-sm font-semibold text-softGray">
                <Skeleton variant="text" width={80} height={25} style={{borderRadius: 10}} />
              </div>
            </div>
          </div>
          <div className="flex mx-6">
            <Image src={PostGray} height={20} width={20} alt="" />
            <div className="mx-2">
              <div className="text-sm font-semibold text-softGray">
                <Skeleton variant="text" width={80} height={25} style={{borderRadius: 10}} />
              </div>
            </div>
          </div>
          <div className="flex">
            <Image src={ExperianceGray} height={20} width={20} alt="" />
            <div className="mx-2">
              <div className="text-sm font-semibold text-softGray">
                <Skeleton variant="text" width={80} height={25} style={{borderRadius: 10}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
