import React from "react";

import {
  Container,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  Typography,
  Grid,
} from "@material-ui/core";

// import { MyriadFullBlackIcon } from "../atoms/Icons";
import { useStyles } from "./serverlist.styles";

import { SearchBoxContainer } from "src/components/Search/SearchBoxContainer";
import { useGetList } from "src/hooks/get-list.hooks";

export const ServerListComponent = () => {
  const style = useStyles();
  const { tipsEachNetwork } = useGetList();

  return (
    <Container maxWidth="lg" disableGutters>
      <div className={style.root}>
        <a href={"asda"} rel="noreferrer">
          {/* <MyriadFullBlackIcon /> */}
        </a>
        <Typography className={style.text} color="primary">
          Federated Instances
        </Typography>
        <div className={style.link}>
          <Typography className={style.text} color="primary">
            Go to App
          </Typography>
          <div className={style.divider} />
          <Typography className={style.text} color="primary">
            Visit Website
          </Typography>
        </div>

        <Grid
          container
          justifyContent="flex-start"
          alignContent="flex-start"
          spacing={2}
        >
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={""}>
                    A
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={style.title}>
                      Total instances
                    </Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>100,000</Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={""}>
                    A
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={style.title}>Total users</Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>800,000</Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={""}>
                    A
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography className={style.title}>Total posts</Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>
                      1,500,000
                    </Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
        </Grid>
        <div style={{ marginTop: 16 }}>
          <SearchBoxContainer onSubmitSearch={console.log} hidden={true} />
        </div>
      </div>
      <div className={style.list}>
        <Card className={style.content}>
          <div className={style.flex}>
            <Typography className={style.text} color="primary">
              tothemoon.net
            </Typography>
            <Typography variant="body1" color="textPrimary">
              400 users . 5054 statuses
            </Typography>
          </div>
          <Typography color="textPrimary">
            {
              "The cryptocurrency market is filled with surprises; now, the market is going up, and in an instant, everything comes crashing down. "
            }
          </Typography>
          <div className={style.box}>
            <div className={style.badge}>Generalist</div>
            <div className={style.badge}>API</div>
          </div>
        </Card>
      </div>
    </Container>
  );
};
