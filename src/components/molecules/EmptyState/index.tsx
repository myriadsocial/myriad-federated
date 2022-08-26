import {Typography} from '@mui/material';
import React from 'react';
import {colors} from '../../../utils';

export default function EmptyState() {
  return (
    <div>
      <Typography style={{fontSize: 18, fontWeight: 600, textAlign: 'center'}}>
        You have no notification
      </Typography>
      <Typography
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: colors.textGray,
          textAlign: 'center',
        }}>
        Notifications will be shown here. You can change the type of notification that appears in
        Settings.
      </Typography>
    </div>
  );
}
