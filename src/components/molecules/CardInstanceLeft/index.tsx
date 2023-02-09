import Image from 'next/image';
import { useRouter } from 'next/router';
import { ServerDetail } from 'src/interface/ServerListInterface';

import { ExperianceGray, PostGray, UserGray } from '../../../../public/icons';
import Button from '../../atoms/Button';

const CardInstanceLeft = ({ data }: { data: ServerDetail }) => {
  const router = useRouter();
  return (
    <div className="bg-white flex-1 mr-6 p-6 rounded-[10px] flex">
      <div className="mr-4">
        <Image
          src={data?.serverImageURL}
          height={212}
          width={212}
          style={{ borderRadius: 8 }}
          alt=""
        />
      </div>
      <div>
        <div className="text-[18px] font-bold text-black mb-1">
          {data?.name}
        </div>
        <div className="text-[12px] font-normal text-[#9E9E9E] mb-2">
          by {data?.categories}
        </div>
        <div className="text-[14px] text-[#404040] mb-6">
          {data?.description}
        </div>
        <div>
          <div className="flex">
            <div className="flex">
              <Image src={UserGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-[14px] font-semibold text-[#9e9e9e]">
                  {data?.metric.totalUsers}
                </div>
              </div>
              <div className="text-sm text-[#9e9e9e]">Users</div>
            </div>
            <div className="flex mx-6">
              <Image src={PostGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-[14px] font-semibold text-[#9e9e9e]">
                  {data?.metric.totalPosts.totalAll}
                </div>
              </div>
              <div className="text-sm text-[#9e9e9e]">Post</div>
            </div>
            <div className="flex">
              <Image src={ExperianceGray} height={20} width={20} alt="" />
              <div className="mx-2">
                <div className="text-[14px] font-semibold text-[#9e9e9e]">
                  {data?.metric.totalExperiences}
                </div>
              </div>
              <div className="text-sm text-[#9e9e9e]">Timeline</div>
            </div>
          </div>
        </div>
        <div className="flex mt-[20px]">
          <div className="mr-2">
            <Button
              isFullWidth
              primary
              label="Go to instance"
              onClick={() => undefined}
            />
          </div>
          <div className="">
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
