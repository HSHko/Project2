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

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  const [currentMenuItems, setCurrentMenuItems] = React.useState([]);
  const [linksHighlighterLeft, setLinksHighlighterLeft] = React.useState("0");

  const refs = {
    links: React.useRef<any>({}),
    linksHighlighter: React.useRef<any>(),
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
  }, [isAuthenticated]);

  const handleOnClickMenuItem = React.useCallback((e) => {
    if (e.name == "Logout") {
      dispatch(userAction.logout());
    }
  }, []);

  const moveLinksHighlighterPosition = React.useMemo(() => {
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
  }, [nextRouter.pathname, refs.links.current[`/`]]);

  return (
    <Wrapper>
      <Appbar>
        <div className="appbar-left">CorpLogo</div>
        <div className="appbar-right">
          <Hide when="lessThanTablet">
            <LinksBox>
              {currentMenuItems.map((e) => {
                if (e.link) {
                  return (
                    <NextLink key={e.name} href={e.link}>
                      <a
                        ref={(el) => (refs.links.current[e.linkHelper] = el)}
                        onClick={() => handleOnClickMenuItem(e)}>
                        <Button bg={colors.navbar.top.bg} shadow="none">
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

              <LinksHighlighter
                ref={refs.linksHighlighter}
                style={{ left: linksHighlighterLeft }}></LinksHighlighter>
            </LinksBox>
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
        </div>
      </Appbar>
      <Sidebar></Sidebar>
      <NavbarLine>
        <hr className="Animation"></hr>
      </NavbarLine>
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

  & .appbar-left {
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

// 참고: https://stackoverflow.com/questions/50659284/how-do-i-make-a-css-rotating-animation/50659362
// 참고2: https://codemyui.com/elastic-gradient-navigation-tab/
const LinksHighlighter = styled.div.attrs(() => ({}))`
  position: absolute;
  left: 0px;
  top: 50%;
  width: 20px;
  transform: translate(0, -50%);
  border-radius: 50%;

  opacity: 0.5;

  animation: LinksHighlighter 1s ease 0.5s infinite alternate;
  @keyframes LinksHighlighter {
    from {
      border: 1px solid cyan;
      width: 2rem;
      height: 2rem;
      transform: translate(-50%, -50%);
    }
    to {
      border: 2px solid cyan;
      width: 3rem;
      height: 3rem;
      transform: translate(-50%, -50%);
    }
  }

  & .active {
    transition-duration: 0.6s;
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
    width: 105%;
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
