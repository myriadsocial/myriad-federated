export interface SubmenuItemInterface {
  id: string;
  title: string;
  link: string;
}
export interface NavigationInterface {
  id: string;
  title: string;
  link: string;
  icon: string;
  subMenu: boolean;
  subMenuItems: Array<SubmenuItemInterface>;
}
