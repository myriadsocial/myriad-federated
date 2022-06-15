import React, { useState, useEffect } from "react";
import { ServerListProps } from "src/lib/services/polkadot-js";

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
import { useStyles } from "./server-list.styles";

import { Empty } from "src/components/Empty/Empty";
import { SearchBoxContainer } from "src/components/Search/SearchBoxContainer";
import { useGetList } from "src/hooks/server-list.hooks";

export const ServerListComponent = () => {
  const style = useStyles();
  const { servers, totalInstances, totalUsers, totalPosts } = useGetList();
  const myriadWeb = "https://www.myriad.social/";
  const [serverList, setServerList] = useState<ServerListProps[]>([]);

  useEffect(() => {
    setServerList(servers);
  }, [servers]);

  const handleSearch = (query: string) => {
    const regex = new RegExp(`^${query.toLowerCase()}`, "i");

    const result = servers.filter((server) =>
      server.name.toLowerCase().match(regex)
    );

    if (!query) setServerList(servers);
    else setServerList(result);
  };

  return (
    <Container maxWidth="lg" disableGutters>
      <div className={style.root}>
        <header style={{ marginLeft: 10, position: "relative" }}>
          <a
            href={process.env.MYRIAD_WEBSITE_URL || myriadWeb}
            rel="noreferrer"
          >
            <MyriadFullBlackIcon />
          </a>
          <div className={style.picture}>
            <IllustrationIcon />
          </div>
          <Typography className={style.text} color="primary">
            Federated Instances
          </Typography>
          <div className={style.link}>
            <a
              href={process.env.MYRIAD_WEBSITE_URL || myriadWeb}
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
          <SearchBoxContainer onSubmitSearch={handleSearch} hidden={true} />
        </div>
        <div className={style.list}>
          {serverList.map((server, i) => (
            <Card className={style.content} key={i}>
              <div className={style.flex}>
                <div>
                  <Typography className={style.contentTitle} color="primary">
                    {server.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {server.detail && server.detail.categories.join(" ")}
                    &nbsp;
                  </Typography>
                  <Typography color="textPrimary" className={style.contentText}>
                    {server.detail && server.detail.description}&nbsp;
                  </Typography>
                </div>
                <a
                  href={server.webUrl}
                  rel="noreferrer"
                  className={style.textDecoration}
                  target="_blank"
                >
                  <Button variant="outlined" color="secondary" size="small">
                    Go to instance
                  </Button>
                </a>
              </div>
            </Card>
          ))}
          {!serverList.length && (
            <Empty
              title={"No results"}
              subtitle={"Please make sure your keywords match."}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
