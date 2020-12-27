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

const navbarMainColor = colors.bluegray[5];

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const [currentMenuItems, setCurrentMenuItems] = React.useState([]);
  const [linksHighlighterLeft, setLinksHighlighterLeft] = React.useState("0");
  const [navbarColor, setNavbarColor] = React.useState(navbarMainColor);

  const refs = {
    links: React.useRef<any>({}),
    linksHighlighter: React.useRef<any>(),
    test: React.useRef<any>(),
  };

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    console.log("rendered");
    if (isAuthenticated) {
      setCurrentMenuItems([...menuItems.common, ...menuItems.authenticated]);
    } else {
      setCurrentMenuItems([...menuItems.common, ...menuItems.unAuthenticated]);
    }

    refs.links.current = refs.links.current;

    if (nextRouter.pathname === "/") setNavbarColor("transparent");
  }, [isAuthenticated]);

  // move links highlighter
  React.useEffect(() => {
    if (!Object.keys(refs.links.current)) return;
    let left = 0;
    for (const helper in refs.links.current) {
      left = refs.links.current[helper].offsetLeft;
      left += refs.links.current[helper].offsetWidth >> 1;
      if (helper === `/`) {
        if (helper === nextRouter.pathname) break;
      } else {
        if (nextRouter.pathname.match(new RegExp(`^${helper}`)) !== null) break;
      }
    }
    setLinksHighlighterLeft(left.toString() + `px`);
  }, [currentMenuItems, nextRouter.pathname]);

  // navbar color maker
  React.useEffect(() => {
    if (nextRouter.pathname === "/") setNavbarColor("transparent");
    else setNavbarColor(navbarMainColor);
  }, [nextRouter.pathname]);

  const handleOnClickMenuItem = React.useCallback((e) => {
    if (e.name == "Logout") {
      dispatch(userAction.logout());
    }
  }, []);

  return (
    <Wrapper bg={navbarColor}>
      <Appbar>
        <div
          ref={(el) => (refs.links.current[`a`] = el)}
          className="appbar-left">
          <div className="appbar-logo">
            <NextLink href="/">
              <a className="inherit">
                <h2>Temp logo</h2>
              </a>
            </NextLink>
          </div>
        </div>

        <div className="appbar-right">
          <Hide when="lessThanTablet">
            <LinksBox>
              <LinksHighlighter
                ref={refs.linksHighlighter}
                style={{ left: linksHighlighterLeft }}></LinksHighlighter>
              {currentMenuItems.map((e) => {
                if (e.link) {
                  return (
                    <NextLink key={e.name} href={e.link}>
                      <a
                        ref={(el) => (refs.links.current[e.linkHelper] = el)}
                        onClick={() => handleOnClickMenuItem(e)}>
                        <Button
                          bg="transparent"
                          shadow="none"
                          borderRadius={"50%"}>
                          {e.name}
                        </Button>
                      </a>
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
            </LinksBox>
          </Hide>
          <Button
            shadow="transparent"
            bg="transparent"
            onClick={() => {
              dispatch(sidebarAction.hi());
              dispatch(backdropAction.hi(sidebarAction.lo()));
            }}>
            <MenuIcon></MenuIcon>
          </Button>
        </div>
      </Appbar>
      <Sidebar></Sidebar>
      <NavbarLine>
        <hr className="Animation"></hr>
      </NavbarLine>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs(() => ({}))<any>`
  background-color: ${(p) => p.bg};
  transition: all 0.5s;
`;

const Appbar = styled.div.attrs(() => ({}))<any>`
  width: 100%;
  max-width: ${(p) => p.theme.vars.maxWidth.main};
  height: 3.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(p) => p.bg};
  transition: all 0.5s;

  & .appbar-left {
  }

  & .appbar-logo {
    margin-left: 1rem;
    font-family: "Hanalei Fill", cursive;
    color: black;
  }

  & .appbar-right {
    display: flex;
    align-items: center;
  }
`;

const LinksBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const highlighterColor = colors.deeporange[5];

const LinksHighlighter = styled.div.attrs(() => ({}))`
  position: absolute;
  left: 0px;
  top: 50%;
  width: 2.2rem;
  height: 2.2rem;
  border: 2px solid ${highlighterColor};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  opacity: 0.5;

  &::before {
    position: absolute;
    content: "";
    left: 50%;
    top: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
    border: 2px solid ${highlighterColor};
    border-radius: 50%;
  }

  animation: LinksHighlighter 1s ease 0.5s infinite alternate;
  @keyframes LinksHighlighter {
    from {
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
`;

const NavbarLine = styled.div`
  position: relative;
  width: 100%;
  height: 5px;

  & .Animation {
    position: absolute;
    left: -100%;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: ${colors.bluegray[6]};
    box-shadow: 0px 1px 4px black;

    animation: NavbarLine 1s ease 0.3s 1 forwards;
    @keyframes NavbarLine {
      from {
        left: -100%;
      }
      to {
        left: 0%;
      }
    }
  }
`;
