import {IcCluster, IcDasboard, IcHelp, IcPost, IcSettings, IcUser} from '../../public/icons';
import {NavigationInterface} from '../interface/NavigationInterface';

export const Navigation: Array<NavigationInterface> = [
  {
    id: '1',
    title: 'Dasboard',
    link: '/dashboard',
    icon: IcDasboard,
    subMenu: false,
    subMenuItems: [],
  },
  {
    id: '2',
    title: 'User',
    link: '/dashboard/user',
    icon: IcUser,
    subMenu: true,
    subMenuItems: [
      {
        id: '1',
        title: 'List Report User',
        link: '/dashboard/user',
      },
      {
        id: '2',
        title: 'Responded User',
        link: '/dashboard/user/responded',
      },
    ],
  },
  {
    id: '3',
    title: 'Post',
    link: '/dashboard/post',
    icon: IcPost,
    subMenu: true,
    subMenuItems: [
      {
        id: '1',
        title: 'List Report Post',
        link: '/dashboard/post',
      },
      {
        id: '2',
        title: 'Responded Post',
        link: '/dashboard/post/responded',
      },
    ],
  },
  {
    id: '4',
    title: 'Instance',
    link: '/dashboard/instance',
    icon: IcCluster,
    subMenu: false,
    subMenuItems: [],
  },
  {
    id: '2',
    title: 'Settings',
    link: '/dashboard/settings',
    icon: IcSettings,
    subMenu: false,
    subMenuItems: [],
  },
  {
    id: '5',
    title: 'Help',
    link: '/dashboard/help',
    icon: IcHelp,
    subMenu: false,
    subMenuItems: [],
  },
];
