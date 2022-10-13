import Image from 'next/image';
import { useRouter } from 'next/router';

import { TextField } from '@mui/material';

import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/use-auth.hook';
import {
  ServerDetail,
  ServerListProps,
} from 'src/interface/ServerListInterface';
import { colors } from '../../../utils';
import Button from '../../atoms/Button';

interface EditInstanceInterface {
  instanceName: string;
  apiUrl: string;
  walletAddress: string;
  description: string;
  imageUrl: string;
}
const CardEditInstance = ({ data }: { data: ServerDetail }) => {
  const router = useRouter();
  const { cookie } = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const formik = useFormik<EditInstanceInterface>({
    initialValues: {
      imageUrl: '',
      instanceName: '',
      apiUrl: '',
      walletAddress: '',
      description: '',
    },
    onSubmit: () => {
      undefined;
    },
  });

  useEffect(() => {
    formik.setFieldValue('instanceName', data.name);
    formik.setFieldValue('apiUrl', selectedInstance.apiUrl);
    formik.setFieldValue('walletAddress', selectedInstance.owner);
    formik.setFieldValue('description', data.description);
    formik.setFieldValue('imageUrl', data.serverImageURL);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="bg-white flex-1 mr-6 p-6 rounded-[10px]">
      <div className="text-lg text-black font-semibold mb-4">Edit instance</div>
      <div className="text-sm text-black mb-1">Instance picture</div>
      <div
        className="text-[12px] text-darkGray mb-2"
        style={{ fontSize: 12, color: colors.textDarkGray, marginBottom: 8 }}
      >
        File types supported JPG or PNG. Max size: 5MB
      </div>

      <Image
        src={formik.values.imageUrl}
        height={160}
        width={160}
        style={{ borderRadius: 8 }}
        alt=""
      />
      <div className="text-sm text-primary mt-2">Change picture</div>
      <div className="text-sm color-black mt-6">Detail</div>
      <div className="mt-[24px]">
        <TextField
          id="outlined-basic"
          label="Instance name"
          variant="outlined"
          fullWidth
          value={formik.values.instanceName}
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            id="outlined-basic"
            label="API URL"
            variant="outlined"
            fullWidth
            value={formik.values.apiUrl}
          />
        </div>
        <TextField
          style={{ fontFamily: 'Mulish' }}
          id="outlined-basic"
          label="Wallet Address"
          variant="outlined"
          fullWidth
          value={formik.values.walletAddress}
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={formik.values.description}
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
