import {AvatarWithName} from 'src/components/atoms';
import Button from 'src/components/atoms/Button';
import {ResponseUserReported} from 'src/interface/UserInterface';

export default function CardRecentReported({
  title,
  data,
  pressButton,
}: {
  title: string;
  data: void | undefined | ResponseUserReported;
  pressButton: () => void;
}) {
  return (
    <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl h-[320px]">
      <div className="text-lg font-semibold mb-4">{title}</div>
      <div className="flex flex-col justify-between h-[240px]">
        <div className="grid grid-rows-3 gap-4">
          {data
            ? data.data.slice(0, 4).map((item, index) => {
                return (
                  <AvatarWithName
                    key={index}
                    image={item.reportedDetail.user.profilePictureURL}
                    name={item.reportedDetail.user.name}
                    desc={item ? item?.type?.replace('_', ' ') : ''}
                  />
                );
              })
            : null}
        </div>
        <div className="w-full items-center justify-center flex">
          <Button type="text" onClick={pressButton} label="View all" />
        </div>
      </div>
    </div>
  );
}
