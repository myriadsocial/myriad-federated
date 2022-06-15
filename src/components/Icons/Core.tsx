import React from "react";

import { SvgIcon, SvgIconProps } from "@material-ui/core";

import Magnifier from "src/images/Icons/magnifierIcon.svg";
import MyriadFullBlack from "src/images/Icons/myriad-full-black.svg";
import Illustration from "src/images/Icons/Illustration.svg";

type IconProps = Omit<SvgIconProps, "component">;

export const MyriadFullBlackIcon: React.FC<IconProps> = (props) => (
  <SvgIcon
    component={MyriadFullBlack}
    viewBox="0 0 142 36"
    style={{ width: "auto", height: "auto" }}
    {...props}
  />
);

export const IllustrationIcon: React.FC<IconProps> = (props) => (
  <SvgIcon
    component={Illustration}
    viewBox="0 0 580 500"
    style={{ width: "580px", height: "500px" }}
    {...props}
  />
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <SvgIcon component={Magnifier} viewBox="0 0 24 24" {...props} />
);
