import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import HighlightIcon from "@material-ui/icons/Highlight";
import CloseIcon from "@material-ui/icons/Close";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors, vars } from "styles/theme";

const icons = {
  front: [
    `typescript.png`,
    `nodejs.png`,
    `css.png`,
    `styled_components.png`,
    `atomic_design.png`,
    `redux.png`,
    `thunk.jpg`,
    `material_ui.png`,
    `axios.png`,
    `rest_client.png`,
  ],
  back: [`javascript.png`, `express.png`, `firebase.png`],
  other: [`cpp.png`, `csharp.png`],
  // github
};

export default function fun(props) {
  const [renderer, setRenderer] = React.useState(false);

  const refs = {
    componentWrapper: React.useRef<any>(),
    main: React.useRef<any>(),
    react: React.useRef<any>(),
    skills: React.useRef<any>(),

    skillPresentBox: React.useRef<any>({
      onProgress: false,
      boxOpener: false,
      categoryFront: false,
      categoryBack: false,
      categoryOther: false,
      trajectory: {
        opener: "",
        front: "",
        back: "",
        other: "",
      },
    }),
  };

  React.useEffect(() => {
    console.log({
      height: refs.componentWrapper.current.offsetHeight,
    });
  }, []);

  const handleOnClickArrow = React.useCallback((target) => {
    if (!refs[target]) return;
    refs[target].current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  const handleOnClickSkillPresentBox = React.useCallback(
    async (target) => {
      if (refs.skillPresentBox.current["onProgress"]) return;
      refs.skillPresentBox.current["onProgress"] = true;

      switch (target) {
        case "boxOpener":
          if (refs.skillPresentBox.current["boxOpener"]) {
            refs.skillPresentBox.current["boxOpener"] = false;
          } else {
            refs.skillPresentBox.current["boxOpener"] = true;

            const circleDist = 8;
            refs.skillPresentBox.current["trajectory"] = {
              ...refs.skillPresentBox.current["trajectory"],
              opener: `left: ${
                (refs.componentWrapper.current.offsetWidth >> 1) * 0.8
              }px`,
              front: `transform: translate(0, ${-1.414 * circleDist}rem);`,
              back: `transform: translate(${circleDist}rem, ${circleDist}rem);`,
              other: `transform: translate(${-circleDist}rem, ${circleDist}rem);`,
            };
            setRenderer(!renderer);

            await new Promise((x) => setTimeout(x, 800));
            const leftSideOffset = -(
              refs.componentWrapper.current.offsetWidth >> 1
            );
            refs.skillPresentBox.current["trajectory"] = {
              ...refs.skillPresentBox.current["trajectory"],
              front: `
                transform: translate(${leftSideOffset}px, ${
                -refs.componentWrapper.current.offsetHeight * 0.32
              }px);
                border-radius: 0%;
                width: 100vw;
                height: 24vh;
              `,
              back: `transform: translate(${leftSideOffset}px, ${
                refs.componentWrapper.current.offsetHeight * 0.01
              }px);
                border-radius: 0%;
                width: 100vw;
                height: 24vh;`,
              other: `transform: translate(${leftSideOffset}px, ${
                refs.componentWrapper.current.offsetHeight * 0.32
              }px);
                border-radius: 0%;
                width: 100vw;
                height: 14vh;`,
            };
            setRenderer(renderer);
          }
        default:
          break;
      }
      setRenderer(!renderer);
      refs.skillPresentBox.current["onProgress"] = false;
    },
    [renderer],
  );

  return (
    <Wrapper ref={refs.componentWrapper}>
      <div ref={refs.main} className="main">
        <ScrollButton
          direction="down"
          onClick={() => handleOnClickArrow("react")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        {refs.skillPresentBox.current["boxOpener"] && (
          <>
            <h1>THIS IS INTRODUCE.</h1>
            <h1>THIS IS INTRODUCE.</h1>
            <h1>THIS IS INTRODUCE.</h1>
            <h1>THIS IS INTRODUCE.</h1>
            <h1>THIS IS INTRODUCE.</h1>
            <h1>THIS IS INTRODUCE.</h1>
          </>
        )}
        <SkillsPresentBox>
          <SkillBoxOpener
            trajectory={refs.skillPresentBox.current["trajectory"]}
            isHi={refs.skillPresentBox.current["boxOpener"]}
            onClick={() => handleOnClickSkillPresentBox("boxOpener")}>
            {refs.skillPresentBox.current["boxOpener"] === true ? (
              <CloseIcon></CloseIcon>
            ) : (
              <HighlightIcon></HighlightIcon>
            )}
          </SkillBoxOpener>
          <CategoryItem
            trajectory={refs.skillPresentBox.current["trajectory"]}
            isUnboxed={refs.skillPresentBox.current["boxOpener"]}
            className="front-end"></CategoryItem>
          <CategoryItem
            trajectory={refs.skillPresentBox.current["trajectory"]}
            isUnboxed={refs.skillPresentBox.current["boxOpener"]}
            className="back-end"></CategoryItem>
          <CategoryItem
            trajectory={refs.skillPresentBox.current["trajectory"]}
            isUnboxed={refs.skillPresentBox.current["boxOpener"]}
            className="other"></CategoryItem>
        </SkillsPresentBox>
      </div>
      <div ref={refs.react} className="react">
        <ScrollButton direction="up" onClick={() => handleOnClickArrow("main")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
        <ScrollButton
          direction="down"
          onClick={() => handleOnClickArrow("skills")}>
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </ScrollButton>
      </div>
      <div ref={refs.skills} className="skills">
        <ScrollButton
          direction="up"
          onClick={() => handleOnClickArrow("react")}>
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

  .main {
    background-color: ${colors.brown[3]};
  }

  .react {
    background-color: ${colors.amber[3]};
    scroll-margin-block-start: 0px;
  }

  .skills {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${colors.deeppurple[4]};
  }
`;

const ScrollButton = styled.button.attrs(() => ({}))<any>`
  position: absolute;
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

const SkillsArea = styled.div`
  background-color: ${colors.gray[3]};

  .skill-icon {
    border-radius: 70%;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }
`;

const SkillsPresentBox = styled.nav.attrs(() => ({}))<any>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 6rem;
  height: 6rem;
  margin: auto;

  & > * {
    position: absolute;

    width: 5rem;
    height: 5rem;

    border: none;
    border-radius: 100%;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.12);

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SkillBoxOpener = styled.nav.attrs(() => ({}))<any>`
  z-index: 2;
  left: 0;

  background-color: white;

  transition: all 0.3s ease;
  transform: translate(0, 0) scale(1.02);

  &:hover {
    ${(p) => {
      if (!p.isHi) {
        return css`
          transform: translate(0, 0) scale(1.4);
        `;
      }
    }}
  }

  ${(p) => {
    if (p.isHi) {
      return css`
        ${p.trajectory.opener};
      `;
    }
  }}
`;

const CategoryItem = styled.nav.attrs(() => ({}))<any>`
  z-index: 1;

  transition: all 0.3s ease;
  transform: translate(0, 0);

  &.front-end {
    background-color: crimson;

    ${(p) => {
      if (p.isUnboxed) {
        return css`
          ${p.trajectory.front};
        `;
      }
    }}
  }

  &.back-end {
    background-color: blueviolet;

    ${(p) => {
      if (p.isUnboxed) {
        return css`
          ${p.trajectory.back};
        `;
      }
    }}
  }

  &.other {
    background-color: yellowgreen;

    ${(p) => {
      if (p.isUnboxed) {
        return css`
          ${p.trajectory.other};
        `;
      }
    }}
  }
`;
