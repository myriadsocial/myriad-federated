import {Typography} from '@mui/material';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {ExperianceGray, PostGray, UserGray} from '../../../../public/icons';
import {colors} from '../../../utils';
import Button from '../../atoms/Button';
const CardInstanceLeft = () => {
  const router = useRouter();
  return (
    <div className="bg-white flex-1 mr-6 p-6 rounded-[10px] flex">
      <div className="mr-4">
        <Image
          src={'https://i.pravatar.cc/300'}
          height={212}
          width={212}
          style={{borderRadius: 8}}
        />
      </div>
      <div>
        <Typography
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: colors.black,
            marginBottom: 4,
          }}>
          Art Space
        </Typography>
        <Typography
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: colors.textGray,
            marginBottom: 8,
          }}>
          by 0xabcdefgh
        </Typography>
        <Typography
          style={{
            fontSize: 14,
            fontWeight: 400,
            color: colors.textDarkGray,
            marginBottom: 24,
          }}>
          Post votum promissa memini cuius adeptione cupis; quem pollicitus est aversione aversi et
          fuga. Qui autem de re desit libido frustra miseri qui incurrit odium sui obiecti. Post
          votum promissa memini cuius adeptione. Post votum promissa memini cuius adeptione. Post
          votum promissa.
        </Typography>
        <div>
          <div className="flex">
            <div className="flex">
              <Image src={UserGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}>
                  80
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}>
                Users
              </Typography>
            </div>
            <div className="flex mx-6">
              <Image src={PostGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}>
                  80
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}>
                Post
              </Typography>
            </div>
            <div className="flex">
              <Image src={ExperianceGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textGray,
                  }}>
                  322
                </Typography>
              </div>
              <Typography
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: colors.textGray,
                }}>
                Experiance
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[135px] mr-2">
            <Button isFullWidth primary label="Go to instance" onClick={() => undefined} />
          </div>
          <div className="w-[135px]">
            <Button
              isFullWidth
              label="Edit instance"
              onClick={() => router.push('/dashboard/instance/edit')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInstanceLeft;
