import { Button as ButtonMui } from "@mui/material";
import { colors } from "../../../utils";

interface ButtonOutlineInterface {
  onClick: any;
  label: string;
  primary?: boolean;
  isFullWidth?: boolean;
  disable?: boolean;
  type?: string;
}

const Button = ({
  label,
  primary,
  onClick,
  isFullWidth,
  disable,
  type,
  ...props
}: ButtonOutlineInterface) => {
  if (type === "text") {
    return (
      <ButtonMui
        variant="text"
        onClick={onClick}
        style={{
          textTransform: "initial",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          height: 40,
          borderRadius: 20,
        }}
      >
        {label}
      </ButtonMui>
    );
  }
  if (primary) {
    return (
      <ButtonMui
        onClick={disable ? undefined : onClick}
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          height: 40,
          backgroundColor: colors.primary,
          borderRadius: 20,
          color: "white",
          textTransform: "capitalize",
        }}
        fullWidth={isFullWidth}
        {...props}
      >
        {label}
      </ButtonMui>
    );
  }
  return (
    <ButtonMui
      onClick={disable ? undefined : onClick}
      variant="outlined"
      style={{
        height: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: disable ? "#EDEDED" : "white",
        borderRadius: 20,
        color: disable ? "#C2C2C2" : "black",
        borderColor: disable ? "#C2C2C2" : "#FFD24D",
        textTransform: "capitalize",
      }}
      fullWidth={isFullWidth}
      {...props}
    >
      {label}
    </ButtonMui>
  );
};

export default Button;
