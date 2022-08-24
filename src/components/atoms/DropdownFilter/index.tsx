import {NativeSelect, Typography} from '@mui/material';

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
  const {label, data, value, onChange} = props;
  return (
    <div className="flex items-center">
      <div className="mr-2 h-[25px]">
        <Typography fontSize={14} fontWeight={400} color={'#757575'}>
          {label}
        </Typography>
      </div>
      <NativeSelect
        onChange={onChange}
        value={value}
        disableUnderline
        style={{fontSize: 14}}
        size="small"
        // defaultValue={value}
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
