import {Typography} from '@mui/material';
import React from 'react';
import {DataResponseUserReportedInterface} from '../../../interface/UserInterface';
import {dateFormatter} from '../../../utils/dateFormatter';
import AvatarWithName from '../AvatarWithName';

export default function ListReporter({data}: {data: DataResponseUserReportedInterface}) {
  return (
    <div key={data?.id} className="mb-[24px]">
      <div className="flex justify-between">
        <AvatarWithName
          image={data?.reporter?.profilePictureURL ?? ''}
          name={data?.reporter?.name ?? ''}
          desc={data?.reporter?.username ?? ''}
        />
        {data?.createdAt && (
          <Typography fontSize={12} color={'#616161'}>
            {dateFormatter(new Date(data?.createdAt), 'dd MMM yyyy')}
          </Typography>
        )}
      </div>
      <Typography fontSize={14} color={'#0A0A0A'} style={{marginLeft: 48, marginTop: 1}}>
        {data?.description}
      </Typography>
    </div>
  );
}
