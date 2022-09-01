import {Container, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {IcOpenUrl, MyriadFullBlack} from 'public/icons';
import {useState} from 'react';
import Button from 'src/components/atoms/Button';
import CardInstance from 'src/components/atoms/CardInstance';
import EmptyState from 'src/components/atoms/EmptyState';
import ModalComponent from 'src/components/molecules/Modal';
import dynamic from 'next/dynamic';
import {GetServerSidePropsContext} from 'next';
import {PolkadotJs} from 'src/lib/services/polkadot-js';
import {ServerListProps} from 'src/interface/ServerListInterface';
import nookies, {destroyCookie} from 'nookies';

const PolkadotIcon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
});

type InstanceProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const Instance: React.FC<InstanceProps> = ({accountId}) => {
  const router = useRouter();

  const [isShowModalCreateInstance, setIsShowModalCreateInstance] = useState<boolean>(false);
  const [isStepOne, setIsStepOne] = useState<boolean>(true);
  const [isEmptyInstance, setIsEmptyInstance] = useState<boolean>(true);

  const handleClick = () => {
    if (isStepOne) {
      setIsStepOne(false);
    } else {
      setIsStepOne(true);
      setIsShowModalCreateInstance(false);
      setIsEmptyInstance(false);
    }
  };

  // TODO: Handle logout
  const handleLogout = () => {
    destroyCookie(null, 'currentAddress');
    router.push('/');
  };

  const formatAddress = () => {
    if (accountId.length <= 14) return accountId;
    return accountId.substring(0, 5) + '...' + accountId.substring(accountId.length - 5);
  };

  return (
    <div className="bg-background-content min-h-screen p-5">
      <Container>
        <div className="flex justify-between">
          <Image src={MyriadFullBlack} objectFit="contain" alt="" />

          <div className="w-[144px]">
            <Button onClick={handleLogout} type="withChild">
              <div className="flex items-center">
                <PolkadotIcon
                  value={accountId}
                  size={24}
                  theme="polkadot"
                  style={{marginRight: 5}}
                />
                <Typography color={'black'} fontSize={14}>
                  {formatAddress()}
                </Typography>
              </div>
            </Button>
          </div>
        </div>
        <div className="flex justify-between mt-[50px]">
          <div className="text-[28px]">My instance</div>
          <div className="w-[154px]">
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
              title={'You don’t have an instance'}
              desc={'Create your own instance and enjoy the decentralized Web 3 social network.'}
            />
          </div>
        ) : (
          <div className="mt-2">
            <CardInstance
              onClick={() => router.push('/dashboard')}
              serverName={'Metaverse Hunter'}
              serverDetail={'by 0x1234...abcd'}
              serverDescription={
                'Metaverse hunter for all. Join us to get more metaverse knowledge and updates!'
              }
              image={'https://i.pravatar.cc/300'}
            />
          </div>
        )}

        <ModalComponent
          type="small"
          open={isShowModalCreateInstance}
          onClose={() => setIsShowModalCreateInstance(false)}
          title={'Create Instance'}>
          <div className="min-h-[200px] mb-[100px]">
            <div className="mb-2">
              <div className="text-sm">Step {isStepOne ? 1 : 2} of 2</div>
            </div>
            <div className="text-2xl font-semibold">
              {isStepOne ? 'Deploy the server' : 'Get server id'}
            </div>
            {isStepOne ? (
              <>
                <div className="my-2">
                  <div className="text-sm text-textGray text-justify">
                    To create an instance, you have to deploy the server on your own. Please
                    carefully read the deployment guide linked below. You can also access the
                    deployment guide on the settings page.
                  </div>
                </div>
                <div className="flex">
                  <a
                    href={`https://app.testnet.myriad.social/post/`}
                    target="_blank"
                    rel="noreferrer">
                    <button className="w-[20px]">
                      <Image src={IcOpenUrl} height={20} width={20} alt="" />
                    </button>
                  </a>
                  <div className="ml-2 text-[14px] text-primary">View deployment guide</div>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="text-sm text-textGray text-justify">
                  To get a server id, you have to sign the contract on Polkadot.js. The server id
                  will show up in My Instance page, once you sign the contract.
                </div>
              </div>
            )}
          </div>
          <Button
            isFullWidth
            label={isStepOne ? 'Continue' : 'Get server id'}
            primary
            onClick={handleClick}
          />
        </ModalComponent>
      </Container>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);

  if (!cookies?.currentAddress) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let servers: ServerListProps[] = [];

  try {
    const accountId = cookies.currentAddress;
    const polkadot = await PolkadotJs.connect();
    const result = await polkadot?.serverListByOwner(accountId);

    if (polkadot) await polkadot.disconnect();
    if (result) servers = result;
  } catch {
    // ignore
  }

  return {
    props: {
      accountId: cookies.currentAddress,
      servers,
    },
  };
};

export default Instance;
