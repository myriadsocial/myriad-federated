import { useState } from 'react';

import Image from 'next/image';

import { ExperianceGray, PostGray, UserGray } from 'public/icons';
import Button from 'src/components/atoms/Button';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { TotalStaked } from 'src/components/molecules/Staked/TotalStaked';
import { UnclaimReward } from '../Staked/UnclaimReward';
import { Deregister } from '../Staked/Deregister';
import { ServerListProps } from 'src/interface/ServerListInterface';
import addressFormatter from 'src/utils/addressFormatter';
import { BN, BN_ZERO } from '@polkadot/util';

interface CardInstanceInterface {
  server: ServerListProps;
  balance: BN;
  onClick?: () => void;
  onUpdateInstance?: (
    accountId: string,
    instance: ServerListProps,
    data: {
      [property: string]: any;
    },
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  loading?: boolean;
  type?: string;
  users?: number | string | string;
  post?: number | string;
  experience?: number | string;
}
export default function CardInstance(props: CardInstanceInterface) {
  const {
    server,
    onClick,
    type,
    users,
    post,
    experience,
    balance,
    loading,
    onUpdateInstance,
  } = props;

  const [expand, setExpand] = useState<boolean>(false);

  const serverDetail =
    type === 'instance'
      ? 'by ' + addressFormatter({ text: server.owner, length: 4 })
      : server.detail?.categories.join(', ') ?? '';

  const serverDescription =
    type === 'instance'
      ? 'Server Id: ' + server.id
      : server.detail?.description ?? '';

  const onExpand = async () => {
    setExpand(!expand);
  };

  const formatAmount = (value: BN): string => {
    const decimal = 10 ** 18;
    return (+value.toString() / decimal).toLocaleString();
  };

  return (
    <Accordion
      expanded={expand}
      sx={{
        '&.MuiAccordion-root': {
          borderRadius: '10px',
          boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.05)',
          margin: '0 0 20px 0',
        },
        '&.MuiAccordion-root:before': {
          display: 'none',
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
          margin: '12px 0 !important',
        },
      }}
    >
      <AccordionSummary
        style={{ background: '#FFFFFF', borderRadius: '10px' }}
        className="shadow-sm"
      >
        {server.detail?.serverImageURL ? (
          <Image
            src={server.detail.serverImageURL}
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
              <div className="text-2xl text-primary text-left">
                {server?.detail?.name ?? 'Unknown Instance'}
              </div>
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
                    {server?.detail?.name ?? 'Unknown Instance'}
                  </div>
                  <div className="text-sm text-softGray text-left mb-1">
                    {serverDetail}
                  </div>
                  <div className="text-base text-left text-black">
                    {serverDescription}
                  </div>
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
                  <Button
                    onClick={onExpand}
                    label={`${expand ? 'Hide' : 'View'} Staked Assets`}
                  />
                  <Button
                    onClick={onClick}
                    label={'Manage Dashboard'}
                    primary
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails
        style={{ backgroundColor: '#FBFBFB', borderRadius: '0 0 10px 10px' }}
      >
        <div className="grid grid-cols-3 pt-2">
          <TotalStaked
            onUpdateInstance={onUpdateInstance}
            loading={loading}
            instance={server}
            balance={{
              account: balance,
              staked: server?.stakedAmount ?? BN_ZERO,
              formattedAccount: formatAmount(balance),
              formattedStaked: formatAmount(server?.stakedAmount ?? BN_ZERO),
            }}
          />
          <UnclaimReward />
          <Deregister />
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
