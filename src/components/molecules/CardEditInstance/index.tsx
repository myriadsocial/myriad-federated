import Image from 'next/image';
import { useRouter } from 'next/router';

import { TextField } from '@mui/material';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { patchEditInstance } from 'src/api/PATCH_EditInstance';
import { useAuth } from 'src/hooks/use-auth.hook';
import {
  ServerDetail,
  ServerListProps,
} from 'src/interface/ServerListInterface';
import { colors } from '../../../utils';
import Button from '../../atoms/Button';
import { useEnqueueSnackbar } from '../../molecules/Snackbar/useEnqueueSnackbar.hook';
import { UploadImage } from 'src/api/POST_UploadImage';
import { getServersMatric } from 'src/api/GET_serversMatric';

interface EditInstanceInterface {
  instanceName: string;
  apiUrl: string;
  walletAddress: string;
  description: string;
  imageUrl: string;
}
const CardEditInstance = ({
  data,
  accessToken,
}: {
  data: ServerDetail;
  accessToken: string;
}) => {
  const enqueueSnackbar = useEnqueueSnackbar();
  const router = useRouter();
  const { cookie } = useAuth();
  const selectedInstance: ServerListProps = cookie?.selectedInstance ?? '';
  const uploadFieldRef = useRef<HTMLInputElement | null>(null);

  const [imageSelected, setImageSelected] = useState<File | undefined>();

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

  const { refetch: refetchingServerMatric } = useQuery(
    ['/getServerMatric'],
    () => getServersMatric({ baseUrl: selectedInstance.apiUrl }),
    {
      enabled: false,
    },
  );

  const _editInstance = async () => {
    const mutation = await mutateAsync({
      baseUrl: selectedInstance.apiUrl,
      accessToken: accessToken,
      data: {
        name: formik.values.instanceName,
        serverImageURL: formik.values.imageUrl,
        description: formik.values.description,
        categories: data.categories,
        accountId: {},
        images: {},
      },
    });

    if (mutation?.status === 204) {
      enqueueSnackbar({
        message: 'Edit data instance success',
        variant: 'success',
      });
      refetchingServerMatric();
      setTimeout(() => {
        router.push('/dashboard/instance');
      }, 1500);
    } else {
      enqueueSnackbar({
        message: 'Edit data instance failed',
        variant: 'error',
      });
    }
  };

  const { mutateAsync } = useMutation(patchEditInstance);

  const _uploadImage = async () => {
    const mutationUploadImage = await mutateUploadImage({
      file: imageSelected,
      baseUrl: selectedInstance.apiUrl,
      accessToken: accessToken,
    });
    if (mutationUploadImage?.files) {
      formik.setFieldValue('imageUrl', mutationUploadImage.files[0].url);
    }
  };

  const { mutateAsync: mutateUploadImage } = useMutation(UploadImage);

  useEffect(() => {
    formik.setFieldValue('instanceName', data?.name);
    formik.setFieldValue('apiUrl', selectedInstance.apiUrl);
    formik.setFieldValue('walletAddress', selectedInstance.owner);
    formik.setFieldValue('description', data?.description);
    formik.setFieldValue('imageUrl', data?.serverImageURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectFile = (): void => {
    const uploadField: any = uploadFieldRef?.current;

    if (!uploadField) return;

    uploadField.click();
  };

  const handleFileChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageSelected(event.target.files[0]);

      if (uploadFieldRef && uploadFieldRef.current) {
        uploadFieldRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    if (imageSelected) {
      _uploadImage();
    }
  }, [imageSelected]);

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
        src={
          imageSelected
            ? URL.createObjectURL(imageSelected)
            : formik.values.imageUrl
        }
        height={160}
        width={160}
        style={{ borderRadius: 8 }}
        objectFit="fill"
        alt=""
      />
      <div>
        <button onClick={selectFile} className="text-sm text-primary mt-2">
          Change picture
          <input hidden accept="image/*" multiple type="file" />
        </button>
      </div>
      <input
        type="file"
        ref={uploadFieldRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <div className="text-sm color-black mt-6">Detail</div>
      <div className="mt-[24px]">
        <TextField
          id="outlined-basic"
          label="Instance name"
          variant="outlined"
          fullWidth
          value={formik.values.instanceName}
          onChange={(e) => formik.setFieldValue('instanceName', e.target.value)}
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            id="outlined-basic"
            label="API URL"
            variant="outlined"
            fullWidth
            value={formik.values.apiUrl}
            onChange={(e) => formik.setFieldValue('apiUrl', e.target.value)}
          />
        </div>
        <TextField
          style={{ fontFamily: 'Mulish' }}
          id="outlined-basic"
          label="Wallet Address"
          variant="outlined"
          fullWidth
          value={formik.values.walletAddress}
          onChange={(e) =>
            formik.setFieldValue('walletAddress', e.target.value)
          }
        />
        <div className="my-[24px]">
          <TextField
            style={{ fontFamily: 'Mulish' }}
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue('description', e.target.value)
            }
          />
        </div>
        <div className="flex">
          <div className="mr-[10px]">
            <Button primary label="Save changes" onClick={_editInstance} />
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
