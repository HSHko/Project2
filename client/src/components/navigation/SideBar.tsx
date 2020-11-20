import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { css } from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import Button from "atoms/Button";
import CloseIcon from "@material-ui/icons/Close";
import { sideBars, dialogs } from "store";
import AddToHomeScreenIcon from "@material-ui/icons/AddToHomeScreen";
import menuItems from "./menuItems";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });

  const dispatch = useDispatch();
  const storeSideAnchor = useSelector((x: RootState) => x.sideBar);

  const handleOnClickListItem = React.useCallback(
    e => () => {
      dispatch(sideBars.lo());
      if (e.label === "login") {
        dispatch(dialogs.hi("login"));
      }
    },
    [dispatch],
  );

  return (
    <Wrapper active={storeSideAnchor.isHi}>
      <AppBar className="head">
        <Button onClick={() => dispatch(sideBars.lo())}>
          <CloseIcon color="primary"></CloseIcon>
          CLOSE
        </Button>
      </AppBar>
      <AppBar className="list">
        {menuItems.map(e => {
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
  background-color: ${p => p.theme.colors.nav.side.main};
  ${p =>
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
    height: ${p => p.theme.vars.navbar.height};
    background-color: ${p => p.theme.colors.nav.top.main};
    display: flex;
    align-items: center;
  }

  &.list {
    display: flex;
    flex-direction: column;
  }
`;
