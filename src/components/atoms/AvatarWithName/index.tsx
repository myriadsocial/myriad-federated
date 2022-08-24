import {Avatar, Typography} from '@mui/material';

interface AvatarWithButtonInterface {
  image: string;
  name: string;
  desc: string;
}
const AvatarWithName = (props: AvatarWithButtonInterface) => {
  const {image, name, desc} = props;
  return (
    <div className="flex">
      <Avatar src={image} />
      <div className="ml-2">
        <Typography textTransform={'capitalize'} fontSize={14} color={'#0A0A0A'}>
          {name}
        </Typography>
        <Typography textTransform={'capitalize'} fontSize={10} color={'#616161'}>
          {desc}
        </Typography>
      </div>
    </div>
  );
};

export default AvatarWithName;
