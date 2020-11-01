import React from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import Button from "atoms/Button";
import CloseIcon from "@material-ui/icons/Close";

export default function fun(props) {
  console.log("init");

  const dispatch = useDispatch();
  const storeSideAnchor = useSelector((x: RootState) => x.sideBar);

  return (
    <Wrapper active={storeSideAnchor.isHi}>
      <AppBar className="head">
        <Button>
          <CloseIcon color="primary">
            <h6>CLOSE</h6>
          </CloseIcon>
        </Button>
      </AppBar>
      <AppBar className="list"></AppBar>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ active?: boolean }>`
  position: fixed;
  width: 14rem;
  max-width: 50vh;
  height: 100vh;
  background-color: ${p => p.theme.color.nav.side.main};
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
  &.Head {
    height: ${p => p.theme.vars.navbar.height};
    background-color: ${p => p.theme.color.nav.side.main};
    display: flex;
    align-items: center;
  }

  &.List {
    display: flex;
    flex-direction: column;
  }
`;
