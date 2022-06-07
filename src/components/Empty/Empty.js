import React from "react";

import { Typography } from "@material-ui/core";

import { useStyles } from "./Empty.styles";

export const Empty = (props) => {
  const { title, subtitle, children } = props;
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Typography variant="h4" className={styles.title} component="p">
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" component="p">
        {subtitle}
      </Typography>
      {children}
    </div>
  );
};
