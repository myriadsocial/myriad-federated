import React from "react";

import {
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  Typography,
  Grid,
  Button,
  SvgIcon,
} from "@material-ui/core";

import { ServerIcon, UsersIcon, PencilAltIcon } from "@heroicons/react/outline";

import { MyriadFullBlackIcon, IllustrationIcon } from "../Icons";
import { useStyles } from "./serverlist.styles";

import { SearchBoxContainer } from "src/components/Search/SearchBoxContainer";
import { useGetList } from "src/hooks/get-list.hooks";

export const ServerListComponent = () => {
  const style = useStyles();
  const { servers, totalInstances, totalUsers, totalPosts } = useGetList();

  return (
    <Container maxWidth="lg" disableGutters>
      <div className={style.root}>
        <header style={{ marginLeft: 10, position: "relative" }}>
          <a href={process.env.MYRIAD_WEBSITE_URL} rel="noreferrer">
            <MyriadFullBlackIcon />
          </a>
          <div className={style.illustration}>
            <IllustrationIcon />
          </div>
          <Typography className={style.text} color="primary">
            Federated Instances
          </Typography>
          <div className={style.link}>
            <a
              href={process.env.MYRIAD_APP_URL}
              className={style.textDecoration}
              rel="noreferrer"
            >
              <Typography color="primary">Go to App</Typography>
            </a>
            <div className={style.divider} />
            <a
              href={process.env.MYRIAD_WEBSITE_URL}
              className={style.textDecoration}
              rel="noreferrer"
            >
              <Typography color="primary">Visit Website</Typography>
            </a>
          </div>
        </header>

        <Grid
          container
          justifyContent="flex-start"
          alignContent="flex-start"
          spacing={2}
        >
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemIcon classes={{ root: style.icon }}>
                  <SvgIcon component={ServerIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={style.title}>
                      Total instances
                    </Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>
                      {totalInstances.toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemIcon classes={{ root: style.icon }}>
                  <SvgIcon component={UsersIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={style.title}>Total users</Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>
                      {totalUsers.toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
          <Grid item md={4} xs={6}>
            <Card variant="outlined" className={style.card}>
              <ListItem>
                <ListItemIcon classes={{ root: style.icon }}>
                  <SvgIcon component={PencilAltIcon} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={style.title}>Total posts</Typography>
                  }
                  secondary={
                    <Typography className={style.subtitle}>
                      {totalPosts.toLocaleString()}
                    </Typography>
                  }
                />
              </ListItem>
            </Card>
          </Grid>
        </Grid>
        <div>
          <SearchBoxContainer onSubmitSearch={console.log} hidden={true} />
        </div>
        <div className={style.list}>
          {servers.map(
            (server, i) =>
              server.detail && (
                <Card className={style.content} key={i}>
                  <div className={style.flex}>
                    <div>
                      <Typography
                        className={style.contentTitle}
                        color="primary"
                      >
                        {server.name}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        Crypto, Cryptocurrency, market, Ethereum, NFT
                      </Typography>
                      <Typography
                        color="textPrimary"
                        className={style.contentText}
                      >
                        {server.detail.description}
                      </Typography>
                    </div>
                    <a
                      href={server.webUrl}
                      rel="noreferrer"
                      className={style.textDecoration}
                    >
                      <Button variant="outlined" color="secondary" size="small">
                        Go to instance
                      </Button>
                    </a>
                  </div>
                </Card>
              )
          )}
        </div>
      </div>
    </Container>
  );
};
