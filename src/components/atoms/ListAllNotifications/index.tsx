import {ListItemButton} from '@mui/material';
import Image from 'next/image';
import {useMemo} from 'react';
import {
  NotificationJoinInstance,
  NotificationsDeployNode,
  NotificationsReportPost,
  NotificationsReportUser,
} from '../../../../public/icons';
import {ListAllNotificationsInterface} from '../../../interface/NotificationsInterface';

const ListAllNotifications = (props: ListAllNotificationsInterface) => {
  const {label, desc, time} = props;

  const iconsType = useMemo(
    () => ({
      report_post: NotificationsReportPost,
      report_user: NotificationsReportUser,
      report_comment: NotificationJoinInstance,
      deploy: NotificationsDeployNode,
    }),
    [],
  );

  return (
    <ListItemButton style={{justifyContent: 'space-between'}} onClick={() => undefined}>
      <div className="flex">
        <Image
          src={iconsType[desc as keyof typeof iconsType]}
          height={48}
          width={48}
          alt="dasboard"
        />
        <div className="flex-1 ml-2">
          <div className="text-sm text-black">{label}</div>
          <div className="text-sm capitalize text-[#9E9E9E]">{desc.replace('_', ' ')}</div>
        </div>
      </div>
      <div className="text-xs text-[#9E9E9E]">{time}</div>
    </ListItemButton>
  );
};

export default ListAllNotifications;
