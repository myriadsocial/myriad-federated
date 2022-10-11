import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { List } from '@mui/material';

import { Logo } from 'public/icons';

import {
  NavigationInterface,
  SubmenuItemInterface,
} from '../../../interface/NavigationInterface';
import { Navigation } from '../../../navigations';
import ListSidebar from '../../atoms/ListSidebar';
import SubListSidebar from '../../atoms/SubListSidebar';
import { handleContactUs } from 'src/utils/openUrl';

const Siderbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [mainMenu, setMainMenu] = useState('');

  const handleListItemClick = (item: NavigationInterface) => {
    if (item.title === 'Help') {
      handleContactUs();
    } else {
      router.push(item.link);
      setOpen(true);
    }
  };

  const handleSubItemClick = (item: SubmenuItemInterface) => {
    router.push(item.link);
  };

  const getMainMenu = useCallback(() => {
    const url = router.pathname.split('/');
    const dataUrl = '/' + url[1] + '/' + url[2];
    setMainMenu(dataUrl);
  }, [router.pathname]);

  useEffect(() => {
    if (router.pathname.split('/').length === 4) getMainMenu();
    else setMainMenu(router.pathname);
  }, [router.pathname, getMainMenu]);

  return (
    <div className="min-h-screen">
      <div className="p-6 text-center pb-[48px]">
        <Image src={Logo} height={32} width={141} alt="logo" />
      </div>
      <List component="nav" style={{ backgroundColor: 'white' }}>
        {Navigation.map((menuItem, index) => {
          return (
            <div key={index}>
              <ListSidebar
                onClick={() => handleListItemClick(menuItem)}
                image={menuItem.icon}
                title={menuItem.title}
                isSelected={
                  menuItem.subMenu
                    ? menuItem.link === mainMenu
                    : menuItem.link === router.pathname
                }
                isShowSubMenu={
                  (menuItem.subMenu &&
                    open &&
                    menuItem.link === router.pathname) ||
                  menuItem.link === mainMenu
                }
                isHaveSubMenu={menuItem.subMenu}
              />

              {(menuItem.subMenu && menuItem.link === router.pathname) ||
              menuItem.link === mainMenu
                ? menuItem.subMenuItems.map((subMenuItem, index) => {
                    return (
                      <SubListSidebar
                        key={index}
                        title={subMenuItem.title}
                        inOpen={open}
                        isSelected={subMenuItem.link === router.pathname}
                        onClick={() => handleSubItemClick(subMenuItem)}
                      />
                    );
                  })
                : null}
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default Siderbar;
