import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { css } from "styled-components";

// Material-ui stuff
import CloseIcon from "@material-ui/icons/Close";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sideBarAction } from "store";
import { dialogAction } from "store";
import { RootState } from "store";

// Components
import { colors } from "styles/theme";
import menuItems from "./menuItems";
import Button from "atoms/Button";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  }, []);

  const dispatch = useDispatch();
  const storeSideBar = useSelector((x: RootState) => x.sideBarReducer);

  const handleOnClickListItem = React.useCallback(
    (e) => () => {
      dispatch(sideBarAction.hi());
      if (e.label === "login") {
        dispatch(dialogAction.hi("login"));
      }
    },
    [],
  );

  return (
    <Wrapper active={storeSideBar.isHi}>
      <AppBar className="head">
        <Button onClick={() => dispatch(sideBarAction.lo())}>
          <CloseIcon color="primary"></CloseIcon>
          CLOSE
        </Button>
      </AppBar>
      <AppBar className="list">
        {menuItems.map((e) => {
          if (e.link) {
            return (
              <Link key={e.name} href={e.link}>
                <Button as="a">
                  {" "}
                  <AddToHomeScreenIcon></AddToHomeScreenIcon>
                  {e.name}
                </Button>
              </Link>
            );
          } else {
            return (
              <Button key={e.name} onClick={handleOnClickListItem(e)}>
                <AddToHomeScreenIcon></AddToHomeScreenIcon>
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
  top: 0;
  width: 14rem;
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
    height: ${(p) => p.theme.vars.navbar.height};
    background-color: ${(p) => p.theme.colors.navbar.top.main};
    display: flex;
    align-items: center;
  }

  &.list {
    display: flex;
    flex-direction: column;
  }
`;
