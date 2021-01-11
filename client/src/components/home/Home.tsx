import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { useInView } from "react-intersection-observer";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors, vars } from "styles/theme";
import MainArea from "./MainArea";
import IntroduceArea from "./IntroduceArea";
import SkillArea from "./SkillArea";

export default function fun(props) {
  const nextRouter = useRouter();

  const refs = {
    componentWrapper: React.useRef<any>(),
    mainComponent: React.useRef<any>(),
    introduceComponent: React.useRef<any>(),
    skillComponent: React.useRef<any>(),
  };

  React.useEffect(() => {
    refs.introduceComponent.current.focus();
    if (!nextRouter.query.pos) {
      refs["mainComponent"].current.scrollIntoView({
        block: "center",
      });
    } else {
      if (nextRouter.query.pos === `introduce`) {
        refs["introduceComponent"].current.scrollIntoView({
          block: "center",
        });
        console.log("co intro");
      } else if (nextRouter.query.pos === `skill`) {
        refs["skillComponent"].current.scrollIntoView({
          block: "center",
        });
      }
    }
  }, [nextRouter.query]);

  const handleOnClickArrow = React.useCallback((target) => {
    if (!refs[target]) return;
    refs[target].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  return (
    <Wrapper ref={refs.componentWrapper}>
      <div ref={refs.mainComponent} className="pageArea main">
        <ScrollButton
          direction="down"
          onClick={() => handleOnClickArrow("introduceComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        <MainArea></MainArea>
      </div>
      <div ref={refs.introduceComponent} className="pageArea introduce">
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
        <IntroduceArea></IntroduceArea>
      </div>
      <div ref={refs.skillComponent} className="pageArea skill">
        <ScrollButton
          direction="up"
          onClick={() => handleOnClickArrow("introduceComponent")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        <SkillArea></SkillArea>
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

  .pageArea {
    position: relative;
    scroll-snap-align: center;
    width: 100%;
    height: 100vh;
  }

  .main {
    background-color: black;
  }

  .introduce {
  }

  .skill {
    padding-top: 3.7rem;
    background-color: #00303f;
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
  background-color: rgba(255, 255, 255, 0.6);

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
