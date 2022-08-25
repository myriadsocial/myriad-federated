import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: 20,
      flexDirection: "column",
      display: "flex",
      rowGap: 20,
    },
    container: {
      width: "674px",
    },
    content: {
      flexDirection: "column",
      gap: theme.spacing(1),
      borderRadius: "10px",
      display: "flex",
      padding: "20px 36px",
    },
    contentTitle: {
      fontSize: "24px",
    },
    contentText: {
      fontSize: 16,
      marginTop: theme.spacing(1),
    },
    link: {
      justifyContent: "flex-start",
      alignItems: "center",
      marginBottom: 12,
      display: "flex",
      fontSize: 14,
    },
    textDecoration: {
      textDecoration: "none",
    },
    card: {
      background: theme.palette.primary.main,
      padding: theme.spacing(3),
      borderRadius: 10,
      color: "#FFF",
    },
    text: {
      fontSize: "28px",
      marginBottom: 14,
      fontWeight: 700,
    },
    picture: {
      position: "absolute",
      zIndex: -99,
      right: 0,
      top: -130,
    },
    title: {
      fontSize: "16px",
    },
    subtitle: {
      fontSize: "24px",
    },
    flex: {
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
    },
    list: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    badge: {
      display: "inline-block",
      background: "#EBE0FF",
      borderRadius: "20px",
      padding: "4px 16px",
    },
    icon: {
      background: "#452680",
      borderRadius: 6,
      marginRight: 16,
      color: "#FFF",
      minWidth: 24,
      padding: 7,
    },
  })
);
