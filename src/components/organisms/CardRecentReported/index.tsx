import React from 'react';
import {AvatarWithName} from 'src/components/atoms';
import Button from 'src/components/atoms/Button';

export default function CardRecentReported({title}: {title: string}) {
  return (
    <div className="col-span-1 p-5 bg-white shadow-lg rounded-2xl h-[320px]">
      <div className="text-lg font-semibold mb-4">{title}</div>
      <div className="grid grid-rows-3 gap-4">
        <AvatarWithName
          image={'https://i.pravatar.cc/300'}
          name={'Ronaldo'}
          desc={'Reported a user'}
        />
        <AvatarWithName
          image={'https://i.pravatar.cc/300'}
          name={'Ronaldo'}
          desc={'Reported a user'}
        />
        <AvatarWithName
          image={'https://i.pravatar.cc/300'}
          name={'Ronaldo'}
          desc={'Reported a user'}
        />
        <AvatarWithName
          image={'https://i.pravatar.cc/300'}
          name={'Ronaldo'}
          desc={'Reported a user'}
        />
      </div>
      <div className="w-full items-center justify-center flex">
        <Button type="text" onClick={undefined} label="View all" />
      </div>
    </div>
  );
}
