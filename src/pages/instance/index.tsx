import { Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { IcOpenUrl, MyriadFullBlack } from "public/icons";
import { useEffect, useState } from "react";
import Button from "src/components/atoms/Button";
import CardInstance from "src/components/atoms/CardInstance";
import EmptyState from "src/components/atoms/EmptyState";
import ModalComponent from "src/components/molecules/Modal";
import localforage from "localforage";
import Identicon from '@polkadot/react-identicon';

const CURRENT_ADDRESS = 'currentAddress';

export default function Instance() {
  const router = useRouter();

  const [account, setAccount] = useState<string | null>(null);
  const [isShowModalCreateInstance, setIsShowModalCreateInstance] =
    useState<boolean>(false);
  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [isEmptyInstance, setIsEmptyInstance] = useState<boolean>(true);

  useEffect(() => {
    localforage.getItem(CURRENT_ADDRESS, (err, value) => {
      if (err || !value) return router.push('/')
      setAccount(value as string);
    });
  }, [])

  const handleClick = () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else {
      setIsStepOne(true);
      setIsShowModalCreateInstance(false);
      setIsEmptyInstance(false);
    }
  };

  const formatAddress = () => {
    if (!account) return;
    if (account.length <= 14) return account;
    return account.substring(0, 5) + '...' + account.substring(account.length - 5);
  }

  return (
    <div className="bg-background-content min-h-screen p-5">
      <Container>
        <div className="flex justify-between">
          <Image src={MyriadFullBlack} objectFit="contain" alt="" />
          <div className="w-[144px]">
            <Button onClick={undefined} type="withChild">
              <div className="flex items-center">
                <Identicon value={account} size={24} theme="polkadot" style={{marginRight: 5}}/>
                <Typography color={"black"} fontSize={14}>
                  {formatAddress()}
                </Typography>
              </div>
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-[50px]">
          <div className="text-[28px]">My instance</div>
          <div className="w-[144px]">
            <Button
              isFullWidth
              label="Create Instance"
              primary
              onClick={() => setIsShowModalCreateInstance(true)}
            />
          </div>
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
            <CardInstance
              onClick={() => router.push("/dashboard")}
              serverName={"Metaverse Hunter"}
              serverDetail={"by 0x1234...abcd"}
              serverDescription={
                "Metaverse hunter for all. Join us to get more metaverse knowledge and updates!"
              }
              image={"https://i.pravatar.cc/300"}
            />
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
              <div className="text-sm">Step {isStepOne ? 1 : 2} of 2</div>
            </div>
            <div className="text-2xl font-semibold">
              {isStepOne ? "Deploy the server" : "Get server id"}
            </div>
            {isStepOne ? (
              <>
                <div className="my-2">
                  <div className="text-sm text-textGray text-justify">
                    To create an instance, you have to deploy the server on your
                    own. Please carefully read the deployment guide linked
                    below. You can also access the deployment guide on the
                    settings page.
                  </div>
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
                  <div className="ml-2 text-[14px] text-primary">
                    View deployment guide
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="text-sm text-textGray text-justify">
                  To get a server id, you have to sign the contract on
                  Polkadot.js. The server id will show up in My Instance page,
                  once you sign the contract.
                </div>
              </div>
            )}
          </div>
          <Button
            isFullWidth
            label={isStepOne ? "Continue" : "Get server id"}
            primary
            onClick={handleClick}
          />
        </ModalComponent>
      </Container>
    </div>
  );
}
