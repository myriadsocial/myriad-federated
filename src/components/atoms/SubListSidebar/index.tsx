import {Collapse, List, ListItemButton} from '@mui/material';

interface SubListSidebarInterface {
  onClick: () => void;
  title: string;
  inOpen: boolean;
  isSelected: boolean;
}
const SubListSidebar = (props: SubListSidebarInterface) => {
  const {onClick, title, inOpen, isSelected} = props;
  return (
    <Collapse in={inOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <div className={isSelected ? 'bg-selected-yellow' : ''}>
          <ListItemButton style={{paddingLeft: 75}} onClick={onClick}>
            <div className="text-lg flex-1">{title}</div>
          </ListItemButton>
        </div>
      </List>
    </Collapse>
  );
};

export default SubListSidebar;
