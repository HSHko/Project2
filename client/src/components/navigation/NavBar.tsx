import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useRouter } from "next/router";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userAction } from "store";
import { backdropAction } from "store";
import { RootState } from "store";
import { sidebarAction } from "store";
import { store } from "store";

// Material-ui stuff
import MenuIcon from "@material-ui/icons/Menu";

// Components
import Sidebar from "./Sidebar";
import menuItems from "./menuItems";
import { colors } from "styles/theme";
import Hide from "atoms/Hide";
import Button from "atoms/Button";

import { refreshToken } from "util/refreshToken";

export default function fun() {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  const [currentMenuItems, setCurrentMenuItems] = React.useState([]);

  React.useEffect(() => {
    console.log("rendered");
    if (isAuthenticated) {
      setCurrentMenuItems([...menuItems.common, ...menuItems.authenticated]);
    } else {
      setCurrentMenuItems([...menuItems.common, ...menuItems.unAuthenticated]);
    }
  }, [isAuthenticated]);

  const handleOnClickMenuItem = React.useCallback((e) => {
    if (e.name == "Logout") {
      dispatch(userAction.logout());
    }
  }, []);

  return (
    <Wrapper>
      <Appbar>
        <div>
          <CorpLogo>CorpLogo</CorpLogo>
        </div>
        <RWrapper>
          <Hide whenShorterThan={"tablet"}>
            <LinksWrapper>
              {currentMenuItems.map((e) => {
                if (e.event == "link") {
                  return (
                    <NextLink key={e.name} href={e.link}>
                      <Button bg={colors.navbar.top.bg} shadow="none" as="a">
                        {e.name}
                      </Button>
                    </NextLink>
                  );
                } else {
                  return (
                    <Button
                      key={e.name}
                      onClick={() => handleOnClickMenuItem(e)}>
                      {e.name}
                    </Button>
                  );
                }
              })}
            </LinksWrapper>
          </Hide>
          <Button
            shadow="transparent"
            bg={colors.navbar.top.bg}
            onClick={() => {
              dispatch(sidebarAction.hi());
              dispatch(backdropAction.hi(sidebarAction.lo()));
            }}>
            <MenuIcon></MenuIcon>
          </Button>
        </RWrapper>
      </Appbar>
      <Sidebar></Sidebar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${(p) => p.theme.colors.lime[2]};
`;

const Appbar = styled.div`
  width: 100%;
  max-width: ${(p) => p.theme.vars.maxWidth.main};
  height: 3.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.navbar.top.bg};
`;

const RWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CorpLogo = styled.div``;

const LinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;
