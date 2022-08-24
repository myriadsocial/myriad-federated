import {TextField, Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {colors} from '../../../utils';
import Button from '../../atoms/Button';
const CardEditInstance = () => {
  const router = useRouter();
  return (
    <div className="bg-white flex-1 mr-6 p-6 rounded-[10px]">
      <Typography
        style={{
          fontSize: 18,
          color: colors.black,
          fontWeight: 600,
          marginBottom: 16,
        }}>
        Edit instance
      </Typography>
      <Typography style={{fontSize: 14, color: colors.black, marginBottom: 4}}>
        Instance picture
      </Typography>
      <Typography style={{fontSize: 12, color: colors.textDarkGray, marginBottom: 8}}>
        File types supported JPG or PNG. Max size: 5MB
      </Typography>

      <Image src={'https://i.pravatar.cc/300'} height={160} width={160} style={{borderRadius: 8}} />
      <Typography style={{fontSize: 14, color: colors.primary, marginTop: 8}}>
        Change picture
      </Typography>
      <Typography style={{fontSize: 14, color: colors.black, marginTop: 24}}>Detail</Typography>
      <div className="mt-[24px]">
        <TextField id="outlined-basic" label="Instance name" variant="outlined" fullWidth />
        <div className="my-[24px]">
          <TextField id="outlined-basic" label="API URL" variant="outlined" fullWidth />
        </div>
        <TextField id="outlined-basic" label="Wallet Address" variant="outlined" fullWidth />
        <div className="my-[24px]">
          <TextField label="Description" multiline rows={3} fullWidth />
        </div>
        <div className="flex">
          <div className="mr-[10px]">
            <Button
              primary
              label="Save changes"
              onClick={() => router.push('/dashboard/instance')}
            />
          </div>
          <Button label="Cancel" onClick={() => router.push('/dashboard/instance')} />
        </div>
      </div>
    </div>
  );
};

export default CardEditInstance;
