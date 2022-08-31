import {Avatar} from '@mui/material';

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
        <div className="text-sm text-black capitalize">{name}</div>
        <div className="text-[10px] capitalize text-[#616161]">{desc}</div>
      </div>
    </div>
  );
};

export default AvatarWithName;
