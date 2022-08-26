import {Avatar, Button, Typography} from '@mui/material';
import Image from 'next/image';
import {IcCalender, IcCopy, IcOpenUrl} from '../../../../public/icons';
import {colors} from '../../../utils';
import {useRouter} from 'next/router';
const CardInstanceRight = () => {
  const router = useRouter();

  return (
    <div className="bg-white w-[314px] rounded-[10px] p-6 h-fit">
      <Avatar src="https://i.pravatar.cc/40" style={{height: 40, width: 40}} />
      <div className="flex mt-2 items-center">
        <div className="flex-1">
          <Typography
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.black,
            }}>
            Unknown.testnet
          </Typography>
          <Typography
            style={{
              fontSize: 14,
              fontWeight: 400,
              color: colors.textDarkGray,
            }}>
            0xabcd...1234
          </Typography>
        </div>
        <Button
          onClick={() => undefined}
          variant="text"
          style={{
            height: 20,
            width: 20,
            background: 'white',
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          }}>
          <Image src={IcCopy} height={20} width={20} alt="" />
        </Button>
      </div>
      <div className="flex my-4 items-center">
        <div className="flex-1">
          <Typography
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: colors.textDarkGray,
            }}>
            API URL
          </Typography>
          <Typography
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: colors.black,
            }}>
            abcd.com
          </Typography>
        </div>
        <Button
          onClick={() => undefined}
          variant="text"
          style={{
            height: 20,
            width: 20,
            background: 'white',
            padding: 0,
            minHeight: 0,
            minWidth: 0,
          }}>
          <Image src={IcOpenUrl} height={20} width={20} alt="" />
        </Button>
      </div>
      <div className="flex mb-4">
        <Image src={IcCalender} height={20} width={20} alt="" />
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: colors.textGray,
            flex: 1,
            marginLeft: 8,
          }}>
          Date
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.textGray,
          }}>
          15 Juli 2022
        </Typography>
      </div>
      <Button
        onClick={() => router.push('/dashboard/settings')}
        variant="text"
        style={{padding: 0, fontSize: 14, color: colors.primary}}>
        Go to setting
      </Button>
    </div>
  );
};

export default CardInstanceRight;
