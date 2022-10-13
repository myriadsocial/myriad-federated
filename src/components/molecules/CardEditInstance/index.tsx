import Image from 'next/image';
import { useRouter } from 'next/router';

import { TextField, Typography } from '@mui/material';

import { colors } from '../../../utils';
import Button from '../../atoms/Button';

const CardEditInstance = () => {
  const router = useRouter();
  return (
    <div className="bg-white flex-1 mr-6 p-6 rounded-[10px]">
      <div className="text-lg text-black font-semibold mb-4">Edit instance</div>
      <Typography
        style={{ fontSize: 14, color: colors.black, marginBottom: 4 }}
      >
        Instance picture
      </Typography>
      <Typography
        style={{ fontSize: 12, color: colors.textDarkGray, marginBottom: 8 }}
      >
        File types supported JPG or PNG. Max size: 5MB
      </Typography>

      <Image
        src={'https://i.pravatar.cc/300'}
        height={160}
        width={160}
        style={{ borderRadius: 8 }}
        alt=""
      />
      <Typography style={{ fontSize: 14, color: colors.primary, marginTop: 8 }}>
        Change picture
      </Typography>
      <Typography
        style={{
          fontFamily: 'Mulish',
          fontSize: 14,
          color: colors.black,
          marginTop: 24,
        }}
      >
        Detail
      </Typography>
      <div className="mt-[24px]">
        <TextField
          id="outlined-basic"
          label="Instance name"
          variant="outlined"
          fullWidth
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            id="outlined-basic"
            label="API URL"
            variant="outlined"
            fullWidth
          />
        </div>
        <TextField
          style={{ fontFamily: 'Mulish' }}
          id="outlined-basic"
          label="Wallet Address"
          variant="outlined"
          fullWidth
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            label="Description"
            multiline
            rows={3}
            fullWidth
          />
        </div>
        <div className="flex">
          <div className="mr-[10px]">
            <Button
              primary
              label="Save changes"
              onClick={() => router.push('/dashboard/instance')}
            />
          </div>
          <Button
            label="Cancel"
            onClick={() => router.push('/dashboard/instance')}
          />
        </div>
      </div>
    </div>
  );
};

export default CardEditInstance;
