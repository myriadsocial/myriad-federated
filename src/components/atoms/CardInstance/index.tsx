import { Typography } from "@mui/material";
import Image from "next/image";
import { ExperianceGray, PostGray, UserGray } from "public/icons";
import React from "react";
import { colors } from "src/utils";

interface CardInstanceInterface {
  onClick?: () => void;
  serverName: string | undefined;
  serverDetail: string | undefined;
  serverDescription: string | undefined;
  image: string;
  type?: string;
}
export default function CardInstance(props: CardInstanceInterface) {
  const {
    onClick,
    serverName,
    serverDescription,
    serverDetail,
    image = "https://i.pravatar.cc/300",
    type,
  } = props;
  return (
    <button
      className="bg-white flex py-5 px-9 rounded-[10px] w-full mt-4 shadow-md"
      onClick={onClick}
    >
      <Image
        src={image}
        alt=""
        height={80}
        width={80}
        className="rounded-[5px]"
      />
      <div className="ml-4">
        <div>
          <div className="text-2xl text-primary text-left">{serverName}</div>
          <div className="text-sm text-textGray text-left">{serverDetail}</div>
          <div className="text-base text-left">{serverDescription}</div>
        </div>
        {type === "landingPage" && (
          <div className="flex mt-2">
            <div className="flex">
              <Image src={UserGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-sm font-semibold text-[#757575]">
                  80 users
                </div>
              </div>
            </div>
            <div className="flex mx-6">
              <Image src={PostGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-sm font-semibold text-[#757575]">
                  80 Post
                </div>
              </div>
            </div>
            <div className="flex">
              <Image src={ExperianceGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-sm font-semibold text-[#757575]">
                  322 Experiance
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
