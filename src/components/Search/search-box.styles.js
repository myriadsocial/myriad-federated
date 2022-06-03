import { makeStyles, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      height: 52,
      borderRadius: 10,
      border: (props) => (props.outlined ? "1px solid #EDEDED" : "none"),

      [theme.breakpoints.down("xs")]: {
        display: (props) => (props.hidden ? "none" : ""),
        height: 36,
      },
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      "& .MuiSvgIcon-root": {
        fill: "none",
      },
      [theme.breakpoints.down("xs")]: {
        padding: 0,
      },
    },
    divider: {
      height: 28,
      margin: 4,
    },
    fill: {
      fill: "currentColor",
    },
  })
);
