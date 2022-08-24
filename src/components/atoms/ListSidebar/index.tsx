import {ExpandLess, ExpandMore} from '@mui/icons-material';
import {ListItemButton, ListItemText} from '@mui/material';
import Image from 'next/image';

interface ListSidebar {
  onClick: () => void;
  isSelected: boolean;
  image: string;
  isShowSubMenu: boolean;
  isHaveSubMenu: boolean;
  title: string;
}

const ListSidebar = (props: ListSidebar) => {
  const {onClick, isSelected, image, isShowSubMenu, title, isHaveSubMenu} = props;

  return (
    <ListItemButton onClick={onClick}>
      <div
        className={
          isSelected
            ? 'bg-yellow h-[40px] w-[40px] rounded-lg items-center justify-center flex mr-[20px]'
            : 'flex h-[40px] w-[40px] items-center justify-center mr-[20px]'
        }>
        <Image src={image} height={24} width={24} alt="dasboard" />
      </div>
      <ListItemText primary={title} />
      {isHaveSubMenu && (isShowSubMenu ? <ExpandLess /> : <ExpandMore />)}
    </ListItemButton>
  );
};

export default ListSidebar;
