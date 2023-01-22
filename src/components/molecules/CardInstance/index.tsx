import React from 'react';

import Image from 'next/image';

import { ExperianceGray, PostGray, UserGray } from 'public/icons';
import Button from 'src/components/atoms/Button';

interface CardInstanceInterface {
  onClick?: () => void;
  serverName: string | undefined;
  serverDetail: string | undefined;
  serverDescription: string | undefined;
  image: string;
  type?: string;
  users?: number | string | string;
  post?: number | string;
  experience?: number | string;
}
export default function CardInstance(props: CardInstanceInterface) {
  const {
    onClick,
    serverName,
    serverDescription,
    serverDetail,
    image = '',
    type,
    users,
    post,
    experience,
  } = props;
  return (
    <button
      className="bg-white flex py-5 px-9 rounded-[10px] w-full mt-4 shadow-md"
      onClick={onClick}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          height={120}
          width={120}
          className="rounded-[5px]"
        />
      ) : (
        <div className="h-[120px] w-[120px] rounded-[5px] bg-slate-400"></div>
      )}

      <div className="ml-4 w-full">
        {type === 'landingPage' && (
          <>
            <div className="text-2xl text-primary text-left">{serverName}</div>
            <div className="text-sm text-darkGray text-left">
              {serverDetail}
            </div>
            <div className="text-base text-left">{serverDescription}</div>

            <div className="flex mt-2">
              <div className="flex">
                <Image src={UserGray} height={20} width={20} alt="" />
                <div className="mx-2">
                  <div className="text-sm font-semibold text-softGray">
                    {users} users
                  </div>
                </div>
              </div>
              <div className="flex mx-6">
                <Image src={PostGray} height={20} width={20} alt="" />
                <div className="mx-2">
                  <div className="text-sm font-semibold text-softGray">
                    {post} posts
                  </div>
                </div>
              </div>
              <div className="flex">
                <Image src={ExperianceGray} height={20} width={20} alt="" />
                <div className="mx-2">
                  <div className="text-sm font-semibold text-softGray">
                    {experience} experiences
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {type === 'instance' && (
          <>
            <div className="flex justify-between">
              <div className="w-4/5">
                <div className="text-2xl text-primary text-left">
                  {serverName}
                </div>
                <div className="text-sm text-darkGray text-left">
                  {serverDetail}
                </div>
                <div className="text-base text-left">{serverDescription}</div>
              </div>
              <div className="w-1/5 text-right">
                Status: <span className="text-primary">Active</span>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex w-1/2">
                <div className="flex">
                  <Image src={UserGray} height={20} width={20} alt="" />
                  <div className="mx-2">
                    <div className="text-sm font-semibold text-softGray">
                      {users} users
                    </div>
                  </div>
                </div>
                <div className="flex mx-6">
                  <Image src={PostGray} height={20} width={20} alt="" />
                  <div className="mx-2">
                    <div className="text-sm font-semibold text-softGray">
                      {post} posts
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Image src={ExperianceGray} height={20} width={20} alt="" />
                  <div className="mx-2">
                    <div className="text-sm font-semibold text-softGray">
                      {experience} experiences
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-x-2 w-1/2">
                <Button onClick={null} label={'View Staked Assets'} />
                <Button onClick={null} label={'Manage Dashboard'} primary />
              </div>
            </div>
          </>
        )}
      </div>
    </button>
  );
}
