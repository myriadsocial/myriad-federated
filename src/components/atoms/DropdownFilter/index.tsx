import { ChevronDownIcon } from '@heroicons/react/outline';
import { NativeSelect } from '@mui/material';
import Image from 'next/image';
import { IcBackPrimary } from 'public/icons';

interface DropdownItemInterface {
  value: string;
  title: string;
}

interface DropdownFilterInterface {
  label: string;
  data: Array<DropdownItemInterface>;
  value: string;
  onChange: any;
}
const DropdownFilter = (props: DropdownFilterInterface) => {
  const { label, data, value, onChange } = props;
  return (
    <div className="flex items-center">
      <div className="mr-2 h-[25px]">
        <div className="text-sm text-softGray">{label}</div>
      </div>
      <NativeSelect
        onChange={onChange}
        value={value}
        disableUnderline
        style={{ fontSize: 14 }}
        size="small"
        // defaultValue={value}
        IconComponent={(props) => (
          <Image
            alt=""
            src={IcBackPrimary}
            height={16}
            width={16}
            className={'!rotate-[-90deg] ml-[-14px] mt-[-4px]'}
          />
        )}
        sx={{
          '& .MuiNativeSelect-select.MuiInput-input:focus': {
            backgroundColor: 'transparent !important',
          },
        }}
      >
        {data.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.title}
            </option>
          );
        })}
      </NativeSelect>
    </div>
  );
};

export default DropdownFilter;
