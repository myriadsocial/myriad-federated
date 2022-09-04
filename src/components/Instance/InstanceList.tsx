import React from 'react';

import CardInstance from 'src/components/atoms/CardInstance';
import EmptyState from 'src/components/atoms/EmptyState';

import {useRouter} from 'next/router';

import {ServerListProps} from 'src/interface/ServerListInterface';

type InstanceListProps = {
  accountId: string;
  servers: ServerListProps[];
};

export const InstanceList: React.FC<InstanceListProps> = ({accountId, servers}) => {
  const router = useRouter();

  if (servers.length === 0) {
    return (
      <div className="w-full h-[400px] mt-6">
        <EmptyState
          title={'You don’t have an instance'}
          desc={'Create your own instance and enjoy the decentralized Web 3 social network.'}
        />
      </div>
    );
  }

  return (
    <div className="mt-2">
      {servers.map(server => {
        return (
          <CardInstance
            key={server.id}
            onClick={() => router.push('/dashboard')}
            serverName={server?.detail?.name ?? 'Unknown Instance'}
            serverDetail={`by ${accountId}`}
            serverDescription={`Instance Id: ${server.id}`}
            image={server?.detail?.serverImageURL ?? ''}
          />
        );
      })}
    </div>
  );
};
