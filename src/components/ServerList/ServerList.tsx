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

// import { MyriadFullBlackIcon, IllustrationIcon } from "../Icons";
import { useStyles } from "./server-list.styles";

import { Empty } from "src/components/Empty/Empty";
import { SearchBoxContainer } from "src/components/Search/SearchBoxContainer";
import { useGetList } from "src/hooks/server-list.hooks";
import Image from "next/image";
import { Illustration, MyriadFullBlack } from "public/icons";

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
    <div className=" min-h-screen">
      <Container maxWidth="lg" disableGutters>
        <div className={style.root}>
          <div className="mb-[60px] flex justify-between">
            <a
              href={process.env.MYRIAD_WEBSITE_URL || myriadWeb}
              rel="noreferrer"
            >
              <Image alt="" src={MyriadFullBlack} objectFit="contain" />
            </a>
            <div>
              <Button size="small" style={{ color: "black" }}>
                Visit website
              </Button>
              <Button size="small" style={{ color: "black" }}>
                Contact us
              </Button>
              <Button size="small" variant="contained" color="primary">
                Create Instance
              </Button>
            </div>
          </div>
          <header style={{ position: "relative" }}>
            <div className={style.picture}>
              <Image alt="" src={Illustration} objectFit="contain" />
            </div>
            <div className="max-w-[422px]">
              <Typography className={style.text}>
                Join the Myriad Federated Instance now!
              </Typography>
              <div className={style.link}>
                In Myriad Federated Instance, you can create your own instance
                or join as a member of an instance.
              </div>
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
                      <Typography className={style.title}>
                        Total users
                      </Typography>
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
                      <Typography className={style.title}>
                        Total posts
                      </Typography>
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
                    <Typography
                      color="textPrimary"
                      className={style.contentText}
                    >
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
    </div>
  );
};
