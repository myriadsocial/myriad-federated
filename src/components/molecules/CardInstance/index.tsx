import React, { useState } from 'react';

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
import ShowIf from '../common/show-if.component';
import { numberFormatter } from 'src/utils/numberFormatter';
import { InstanceType } from 'src/hooks/use-instances.hook';

interface CardInstanceInterface {
  server: ServerListProps;
  balance: BN;
  type: InstanceType;
  status?: boolean;
  onClick?: () => void;
  onUpdateInstance?: (
    accountId: string,
    instance: ServerListProps,
    data: {
      [property: string]: any;
    },
    estimateFee?: boolean,
  ) => Promise<BN | void>;
  onRemoveInstance?: (
    accountId: string,
    instance: ServerListProps,
  ) => Promise<BN | void>;
  onWithdrawReward?: (
    accountId: string,
    instanceId: number,
  ) => Promise<BN | void>;
  onChangeNetwork?: (
    network: string,
    instance: ServerListProps,
  ) => Promise<void>;
}

export default function CardInstance(props: CardInstanceInterface) {
  const {
    server,
    onClick,
    type,
    balance,
    onUpdateInstance,
    onRemoveInstance,
    onWithdrawReward,
    onChangeNetwork,
    status,
  } = props;

  const [expand, setExpand] = useState<boolean>(false);

  const metric = server?.detail?.metric;
  const post = numberFormatter(metric?.totalPosts?.totalAll ?? 0);
  const users = numberFormatter(metric?.totalUsers ?? 0);
  const experience = numberFormatter(metric?.totalExperiences ?? 0);

  const onExpand = async () => {
    setExpand(!expand);
  };

  const formatAmount = (value: BN): string => {
    const decimal = 10 ** 18;
    return (+value.toString() / decimal).toLocaleString();
  };

  return (
    <React.Fragment>
      <Accordion
        onClick={type === InstanceType.ALL ? onClick : undefined}
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
          {server?.detail?.serverImageURL ? (
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
            <ShowIf condition={type === InstanceType.ALL}>
              <div className="text-2xl text-primary text-left">
                {server?.detail?.name ?? 'Unknown Instance'}
              </div>
              <div className="text-sm text-darkGray text-left">
                {server.detail?.categories.join(', ') ?? ''}
              </div>
              <div className="text-base text-left">
                {server.detail?.description ?? ''}
              </div>

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
            </ShowIf>

            <ShowIf condition={type === InstanceType.OWNED}>
              <div className="flex justify-between">
                <div className="w-4/5">
                  <div className="text-2xl text-primary text-left">
                    {server?.detail?.name ?? 'Unknown Instance'}
                  </div>
                  <div className="text-sm text-softGray text-left mb-1">
                    by {addressFormatter({ text: server.owner, length: 4 })}
                  </div>
                  <div className="text-base text-left text-black">
                    Server Id: {server.id}
                  </div>
                </div>
                <div className="w-1/5 text-right">
                  Status:{' '}
                  <span className={status ? 'text-primary' : 'text-error'}>
                    {status ? 'Active' : 'Inactive'}
                  </span>
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
                    disable={!status}
                  />
                </div>
              </div>
            </ShowIf>
          </div>
        </AccordionSummary>
        <AccordionDetails
          style={{ backgroundColor: '#FBFBFB', borderRadius: '0 0 10px 10px' }}
        >
          <div className="grid grid-cols-3 pt-2">
            <ShowIf condition={Boolean(status)}>
              <TotalStaked
                onUpdateInstance={onUpdateInstance}
                instance={server}
                balance={{
                  account: balance,
                  staked: server?.stakedAmount ?? BN_ZERO,
                  formattedAccount: formatAmount(balance),
                  formattedStaked: formatAmount(
                    server?.stakedAmount ?? BN_ZERO,
                  ),
                }}
              />
              <UnclaimReward
                instance={server}
                onWithdrawReward={onWithdrawReward}
                onChangeNetwork={onChangeNetwork}
              />
              <Deregister
                instance={server}
                onRemoveInstance={onRemoveInstance}
              />
            </ShowIf>
            <ShowIf condition={!Boolean(status)}>
              <UnclaimReward
                instance={server}
                onWithdrawReward={onWithdrawReward}
              />
            </ShowIf>
          </div>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
