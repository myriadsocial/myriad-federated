import { Avatar, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import { MyriadFullBlack } from "public/icons";
import React from "react";
import { colors } from "src/utils";
import { Button as CustomButton } from "@material-ui/core";
export default function Instance() {
  return (
    <div className="bg-background-content min-h-screen p-5">
      <Container>
        <div className="flex justify-between">
          <Image src={MyriadFullBlack} objectFit="contain" alt="" />
          <div className="shadow-lg w-fit rounded-[20px]">
            <CustomButton
              variant="contained"
              size="small"
              style={{ backgroundColor: "white" }}
            >
              <div className="flex items-center">
                <Avatar
                  style={{ height: 24, width: 24, marginRight: 6 }}
                  src="https://i.pravatar.cc/300"
                  alt="profile"
                />
                <Typography color={"black"} fontSize={14}>
                  0xabcd...1234
                </Typography>
              </div>
            </CustomButton>
          </div>
        </div>
        <div className="flex justify-between mt-[50px]">
          <Typography fontSize={28}>My Instance</Typography>
          <CustomButton
            onClick={() => undefined}
            size="small"
            variant="contained"
            color="primary"
          >
            Create Instance
          </CustomButton>
        </div>
        <div className="bg-white mt-6 rounded-[10px] w-full h-[400px] justify-center items-center flex">
          <div className="">
            <Typography
              style={{ textAlign: "center", fontSize: 18, fontWeight: 600 }}
            >
              You don’t have an instance
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: 14, marginTop: 8 }}
            >
              Create your own instance and enjoy the decentralized Web 3 social
              network.
            </Typography>
          </div>
        </div>
      </Container>
    </div>
  );
}
