import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: "22px 0px",
    },
    container: {
      width: "674px",
    },
    content: {
      borderRadius: "10px",
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(1),
    },
    link: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    card: {
      background: theme.palette.primary.main,
      color: "#FFF",
      padding: theme.spacing(1),
    },
    divider: {
      height: "40px",
      width: "2px",
      backgroundColor: theme.palette.text.secondary,
      margin: "0px 10px",
    },
    text: {
      fontSize: "22px",
      fontWeight: 700,
    },
    title: {},
    subtitle: {},
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    list: {},
    box: {
      display: "flex",
      gap: theme.spacing(1),
    },
    badge: {
      display: "inline-block",
      background: "#EBE0FF",
      borderRadius: "20px",
      padding: "4px 16px",
    },
  })
);
