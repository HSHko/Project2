import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import Link from "next/link";

// Material-ui stuff
import CloseIcon from "@material-ui/icons/Close";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sidebarAction } from "store";
import { backdropAction } from "store";
import { RootState } from "store";

// Components
import { colors } from "styles/theme";
import menuItems from "./menuItems";
import Button from "atoms/Button";
import { vars } from "styles/theme";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  }, []);

  const dispatch = useDispatch();
  const storeSidebar = useSelector((x: RootState) => x.sidebarReducer);

  const handleOnClickMenuItem = React.useCallback((e) => {
    dispatch(sidebarAction.hi());
    dispatch(backdropAction.lo());
  }, []);

  const currentMenuItems = [...menuItems.common, ...menuItems.unAuthenticated];

  return (
    <Wrapper active={storeSidebar.isHi}>
      <AppBar className="head">
        <Button onClick={() => dispatch(backdropAction.lo())}>
          <CloseIcon color="primary"></CloseIcon>
          CLOSE
        </Button>
      </AppBar>
      <AppBar className="list">
        {currentMenuItems.map((e) => {
          if (e.event == "link") {
            return (
              <Link key={e.name} href={e.link}>
                <Button as="a" onClick={() => dispatch(backdropAction.lo())}>
                  {e.icon}
                  {e.name}
                </Button>
              </Link>
            );
          } else {
            return (
              <Button key={e.name} onClick={(e) => handleOnClickMenuItem(e)}>
                {e.icon}
                {e.name}
              </Button>
            );
          }
        })}
      </AppBar>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ active?: boolean }>`
  position: fixed;
  z-index: ${vars.zIndex.sidebar};
  top: 0;
  width: 16rem;
  max-width: 50vh;
  height: 100vh;
  background-color: ${colors.navbar.side.bg};
  ${(p) =>
    p.active === false
      ? css`
          right: -100%;
          transition: 250ms;
        `
      : css`
          right: 0;
          transition: 250ms;
        `}
`;

const AppBar = styled.div`
  &.head {
    height: 3.5rem;
    background-color: ${(p) => p.theme.colors.navbar.top.main};
    display: flex;
    align-items: center;
  }

  &.list {
    display: flex;
    flex-direction: column;
  }
`;
