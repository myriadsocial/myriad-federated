import { Button as CustomButton } from "@material-ui/core";
import { Avatar, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { IcOpenUrl, MyriadFullBlack } from "public/icons";
import { useState } from "react";
import CardInstance from "src/components/atoms/CardInstance";
import EmptyState from "src/components/atoms/EmptyState";
import ModalComponent from "src/components/molecules/Modal";
export default function Instance() {
  const [isShowModalCreateInstance, setIsShowModalCreateInstance] =
    useState<boolean>(false);
  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [isEmptyInstance, setIsEmptyInstance] = useState<boolean>(true);
  const router = useRouter();

  const handleClick = () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else {
      setIsStepOne(true);
      setIsShowModalCreateInstance(false);
      setIsEmptyInstance(false);
    }
  };

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
            onClick={() => setIsShowModalCreateInstance(true)}
            size="small"
            variant="contained"
            color="primary"
          >
            Create Instance
          </CustomButton>
        </div>
        {isEmptyInstance ? (
          <div className="w-full h-[400px] mt-6">
            <EmptyState
              title={"You don’t have an instance"}
              desc={
                "Create your own instance and enjoy the decentralized Web 3 social network."
              }
            />
          </div>
        ) : (
          <div className="mt-2">
            <CardInstance onClick={() => router.push("/dashboard")} />
          </div>
        )}

        <ModalComponent
          type="small"
          open={isShowModalCreateInstance}
          onClose={() => setIsShowModalCreateInstance(false)}
          title={"Create Instance"}
        >
          <div className="min-h-[200px] mb-[100px]">
            <div className="mb-2">
              <Typography style={{ fontSize: 14 }}>
                Step {isStepOne ? 1 : 2} of 2
              </Typography>
            </div>
            <Typography style={{ fontSize: 24, fontWeight: 600 }}>
              {isStepOne ? "Deploy the server" : "Get server id"}
            </Typography>
            {isStepOne ? (
              <>
                <div className="my-2">
                  <Typography style={{ fontSize: 14, color: "#404040" }}>
                    To create an instance, you have to deploy the server on your
                    own. Please carefully read the deployment guide linked
                    below. You can also access the deployment guide on the
                    settings page.
                  </Typography>
                </div>
                <div className="flex">
                  <a
                    href={`https://app.testnet.myriad.social/post/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-[20px]">
                      <Image src={IcOpenUrl} height={20} width={20} alt="" />
                    </button>
                  </a>
                  <Typography
                    style={{ fontSize: 14, color: "#7342CC", marginLeft: 8 }}
                  >
                    View deployment guide
                  </Typography>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <Typography style={{ fontSize: 14, color: "#404040" }}>
                  To get a server id, you have to sign the contract on
                  Polkadot.js. The server id will show up in My Instance page,
                  once you sign the contract.
                </Typography>
              </div>
            )}
          </div>
          <CustomButton
            onClick={handleClick}
            type="button"
            variant="contained"
            fullWidth
            color="primary"
          >
            {isStepOne ? "Continue" : "Get server id"}
          </CustomButton>
        </ModalComponent>
      </Container>
    </div>
  );
}
