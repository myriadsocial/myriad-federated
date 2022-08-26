import {ListItemButton, Typography} from '@mui/material';
import Image from 'next/image';
import {useMemo} from 'react';
import {
  NotificationJoinInstance,
  NotificationsDeployNode,
  NotificationsReportPost,
  NotificationsReportUser,
} from '../../../../public/icons';
import {ListAllNotificationsInterface} from '../../../interface/NotificationsInterface';
import {colors} from '../../../utils';

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
          <Typography style={{fontSize: 14, color: colors.black, fontWeight: 400}}>
            {label}
          </Typography>
          <Typography style={{fontSize: 14, color: colors.textGray}} textTransform="capitalize">
            {desc.replace('_', ' ')}
          </Typography>
        </div>
      </div>
      <Typography style={{fontSize: 12, color: colors.textGray}}>{time}</Typography>
    </ListItemButton>
  );
};

export default ListAllNotifications;
