import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors, vars } from "styles/theme";
import IntroduceSkill from "./IntroduceSkill";

export default function fun(props) {
  const refs = {
    componentWrapper: React.useRef<any>(),
    mainComponent: React.useRef<any>(),
    reactComponent: React.useRef<any>(),
    skillComponent: React.useRef<any>(),
  };

  React.useEffect(() => {}, []);

  const handleOnClickArrow = React.useCallback((target) => {
    if (!refs[target]) return;
    refs[target].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <Wrapper ref={refs.componentWrapper}>
      <div ref={refs.skillComponent} className="skillComponent">
        <ScrollButton
          direction="up"
          onClick={() => handleOnClickArrow("reactComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        <IntroduceSkill></IntroduceSkill>
      </div>
      <div ref={refs.mainComponent} className="mainComponent">
        <ScrollButton
          direction="down"
          onClick={() => handleOnClickArrow("reactComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
      </div>
      <div ref={refs.reactComponent} className="reactComponent">
        <ScrollButton
          direction="up"
          onClick={() => handleOnClickArrow("mainComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        <ScrollButton
          direction="down"
          onClick={() => handleOnClickArrow("skillComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  & > * {
    position: relative;
    height: 100%;
    overflow: auto;
    padding: 3.6rem 0;

    scroll-snap-align: center;
  }

  .mainComponent {
    background-color: ${colors.brown[3]};
  }

  .reactComponent {
    background-color: ${colors.amber[3]};
    scroll-margin-block-start: 0px;
  }

  .skillComponent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #e7d9ea;
  }
`;

const ScrollButton = styled.button.attrs(() => ({}))<any>`
  position: absolute;
  z-index: 107;
  left: 50%;

  width: 2rem;
  height: 2rem;

  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(p) => {
    if (p.direction === "up") {
      return css`
        top: 10%;
        transform: translate(-50%, 0%) rotate(180deg);

        animation: scrollButtonUp 1s ease 0.5s infinite none;
        @keyframes scrollButtonUp {
          from {
            transform: translate(-50%, -50%) rotate(180deg);
          }
          to {
            transform: translate(-50%, -80%) rotate(180deg);
          }
        }
      `;
    } else if (p.direction === "down") {
      return css`
        top: 90%;
        transform: translate(-50%, 0%);

        animation: scrollButtonDown 1s ease 0.5s infinite none;
        @keyframes scrollButtonDown {
          from {
            transform: translate(-50%, -50%);
          }
          to {
            transform: translate(-50%, -20%);
          }
        }
      `;
    }
  }}
`;
