import React from 'react';

import { DataResponseUserReportedInterface } from '../../../interface/UserInterface';
import { dateFormatter } from '../../../utils/dateFormatter';
import AvatarWithName from '../AvatarWithName';

export default function ListReporter({
  data,
}: {
  data: DataResponseUserReportedInterface;
}) {
  return (
    <div key={data?.id} className="mb-[24px]">
      <div className="flex justify-between">
        <AvatarWithName
          image={data?.reporter?.profilePictureURL ?? ''}
          name={data?.reporter?.name ?? ''}
          desc={data?.reporter?.username ?? ''}
        />
        {data?.createdAt && (
          <div className="text-xs text-[#616161]">
            {dateFormatter(new Date(data?.createdAt), 'dd MMM yyyy')}
          </div>
        )}
      </div>
      <div className="text-sm ml-12 mt-1">{data?.description}</div>
    </div>
  );
}
