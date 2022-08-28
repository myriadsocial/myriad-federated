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
          <Typography
            style={{
              fontSize: 24,
              color: colors.primary,
              textAlign: "left",
            }}
          >
            {serverName}
          </Typography>
          <Typography
            style={{
              fontSize: 14,
              color: colors.textDarkGray,
              textAlign: "left",
            }}
          >
            {serverDetail}
          </Typography>
          <Typography style={{ fontSize: 16, textAlign: "left" }}>
            {serverDescription}
          </Typography>
        </div>
        {type === "landingPage" && (
          <div className="flex mt-2">
            <div className="flex">
              <Image src={UserGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}
                >
                  80
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}
              >
                Users
              </Typography>
            </div>
            <div className="flex mx-6">
              <Image src={PostGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}
                >
                  80
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}
              >
                Post
              </Typography>
            </div>
            <div className="flex">
              <Image src={ExperianceGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}
                >
                  322
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}
              >
                Experiance
              </Typography>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
