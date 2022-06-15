import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { EmptyProps } from "./Empty";

export const useStyles = makeStyles<Theme, EmptyProps>((theme) =>
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
