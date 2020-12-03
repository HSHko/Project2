import React from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { useRouter } from "next/router";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { backdropAction, RootState } from "store";
import { sidebarAction } from "store";

// Material-ui stuff
import MenuIcon from "@material-ui/icons/Menu";

// Components
import Sidebar from "./Sidebar";
import menuItems from "./menuItems";
import { colors } from "styles/theme";
import Hide from "atoms/Hide";
import Button from "atoms/Button";

export default function fun() {
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log("render");
  }, []);

  const handleOnClickLink = React.useCallback(
    (e) => () => {
      dispatch(sidebarAction.lo());
      if (e.label == "login") {
      }
    },
    [],
  );

  return (
    <Wrapper>
      <Appbar>
        <div>
          <CorpLogo>CorpLogo</CorpLogo>
        </div>
        <RWrapper>
          <Hide shorterThan={"tablet"}>
            <LinksWrapper>
              {menuItems.map((e) => {
                if (e.aim == "link") {
                  return (
                    <NextLink key={e.name} href={e.link}>
                      <Button bg={colors.navbar.top.bg} shadow="none" as="a">
                        {e.name}
                      </Button>
                    </NextLink>
                  );
                } else {
                  return (
                    <Button key={e.name} onClick={handleOnClickLink(e)}>
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
  width: 90%;
  max-width: ${(p) => p.theme.vars.navbar.maxWidth};
  height: ${(p) => p.theme.vars.navbar.height};
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
