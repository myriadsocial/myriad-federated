import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: "#FFF",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      height: "235px",
    },
    title: {
      marginTop: 54,
      fontWeight: 700,
      marginBottom: 12,
    },
  })
);
