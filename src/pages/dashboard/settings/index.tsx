import { ReactElement, useState } from 'react';

import Image from 'next/image';

import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Switch, TextField } from '@mui/material';

import Button from 'src/components/atoms/Button';

import { IcOpenUrl } from 'public/icons';

import ContentLayout from '../../../layout/ContentLayout';

import type { NextPageWithLayout } from '../../_app';

interface dataSettingInterface {
  id: number;
  name: string;
  desc: string;
}

const Settings: NextPageWithLayout = () => {
  const [dataSelected, setDataSelected] = useState<number>();
  const dataSetting: Array<dataSettingInterface> = [
    {
      id: 1,
      name: 'Server verification',
      desc: 'verify the server',
    },
    {
      id: 2,
      name: 'Notification',
      desc: 'Set your notification settings',
    },
  ];

  return (
    <div className="gap-6 grid grid-cols-6">
      <div className="bg-white shadow-lg rounded-[10px] col-span-2 pb-6 h-[243px]">
        <div className="px-6 pt-6 pb-4 text-lg font-semibold">
          Instance setting
        </div>
        {dataSetting.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setDataSelected(index)}
              className={
                dataSelected === index
                  ? 'justify-between items-center flex h-[77px] w-full px-6 py-5 bg-selected-yellow'
                  : 'justify-between items-center flex h-[77px] w-full px-6 py-5'
              }
            >
              <div className="text-left">
                <div className="text-base text-black">{item.name}</div>
                <div className="text-xs text-softGray">{item.desc}</div>
              </div>
              <ArrowForwardIosOutlinedIcon />
            </button>
          );
        })}
      </div>
      {dataSelected === 0 ? (
        <div className="bg-white shadow-lg col-span-4 p-6 rounded-[10px]">
          <div className="text-lg font-semibold">Server verification</div>
          <div className="text-xs text-softGray">
            Verify your deployed server to activate the instance
          </div>
          <div className="my-4">
            <TextField
              id="outlined-basic"
              label="API URL"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex mb-4">
            <a
              href={`https://app.testnet.myriad.social/post/`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="w-[20px]">
                <Image src={IcOpenUrl} height={20} width={20} alt="" />
              </button>
            </a>
            <div className="ml-2 text-sm text-primary">
              View deployment guide
            </div>
          </div>
          <Button label="Verify now" onClick={undefined} primary />
        </div>
      ) : (
        <div className="bg-white shadow-lg col-span-4 p-6 rounded-[10px]">
          <div className="text-lg font-semibold">Notification settings</div>
          <div className="gap-7 mt-5">
            <div className="flex justify-between">
              Reported user
              <Switch color="primary" />
            </div>
            <div className="flex justify-between">
              Reported user
              <Switch color="primary" />
            </div>
            <div className="flex justify-between">
              Reported user
              <Switch color="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout title="Settings">{page}</ContentLayout>;
};

export default Settings;
