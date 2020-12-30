import React from "react";
import styled, { css } from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import HighlightIcon from "@material-ui/icons/Highlight";
import CloseIcon from "@material-ui/icons/Close";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';

const icons = {
  path: `/images/home/icons/`,
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
  other: [`cpp.png`, `csharp.png`, `github.png`, `vscode.png`],
  // github
};

export default function fun(props) {
  const [renderer, setRenderer] = React.useState(false);
  // const nextRouter = useRouter();

  const refs = {
    componentWrapper: React.useRef<any>(),
    main: React.useRef<any>(),
    react: React.useRef<any>(),
    skills: React.useRef<any>(),

    skillPresentBox: React.useRef<any>({
      isOnProgress: false,
      isBoxOpened: false,
      isCategoryOpened: false,
      isCategoryReady: false,
      trajectory: {
        opener: "",
        front: "",
        back: "",
        other: "",
        common: "",
        categoryTitle: "",
        categoryBody: "",
      },
    }),
  };

  const handleOnClickSkillPresentBox = React.useCallback(
    async (target) => {
      if (refs.skillPresentBox.current["isOnProgress"]) return;
      refs.skillPresentBox.current["isOnProgress"] = true;

      switch (target) {
        case "openBox":
          if (refs.skillPresentBox.current["isBoxOpened"]) {
            refs.skillPresentBox.current["isBoxOpened"] = false;
            refs.skillPresentBox.current["isCategoryOpened"] = false;
            refs.skillPresentBox.current["isCategoryReady"] = false;
            refs.skillPresentBox.current["trajectory"] = {};
            setRenderer(!renderer);
          } else {
            refs.skillPresentBox.current["isBoxOpened"] = true;

            const circleDist = 8;
            refs.skillPresentBox.current["trajectory"] = {
              ...refs.skillPresentBox.current["trajectory"],
              front: `transform: translate(0, ${-1.414 * circleDist}rem);`,
              back: `transform: translate(${circleDist}rem, ${circleDist}rem);`,
              other: `transform: translate(${-circleDist}rem, ${circleDist}rem);`,
            };
            setRenderer(!renderer);

            await new Promise((x) => setTimeout(x, 800));
            const leftSideOffset =
              -(refs.componentWrapper.current.offsetWidth >> 1) +
              (refs.skillPresentBox.current["canvas"].offsetWidth >> 1);
            refs.skillPresentBox.current["trajectory"] = {
              ...refs.skillPresentBox.current["trajectory"],
              opener: `
                left: ${
                  (refs.componentWrapper.current.offsetWidth >> 1) * 0.8
                }px;
              `,
              common: `
                border-radius: 0%;
                width: ${refs.componentWrapper.current.offsetWidth}px;
                height: 24vh;
                padding: 2rem;
              `,
              front: `
                transform: translate(${leftSideOffset}px, ${
                -refs.componentWrapper.current.offsetHeight * 0.4
              }px);
              `,
              back: `transform: translate(${leftSideOffset}px, ${
                refs.componentWrapper.current.offsetHeight * -0.1
              }px);
               `,
              other: `transform: translate(${leftSideOffset}px, ${
                refs.componentWrapper.current.offsetHeight * 0.2
              }px);
              `,
              categoryTitle: `
                text-align: left;
                font-size: 1.4rem;
                margin: 0;
                margin-bottom: 1.5rem;
              `,
            };
            refs.skillPresentBox.current["isCategoryOpened"] = true;
            setRenderer(renderer);

            await new Promise((x) => setTimeout(x, 200));
            refs.skillPresentBox.current["isCategoryReady"] = true;
            setRenderer(!renderer);
          }
        default:
          break;
      }
      refs.skillPresentBox.current["isOnProgress"] = false;
    },
    [renderer],
  );

  React.useEffect(() => {});

  return (
    <Wrapper ref={refs.componentWrapper}>
      <SkillsPresentBox
        ref={(el) => (refs.skillPresentBox.current["canvas"] = el)}>
        <SkillBoxOpener
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}
          onClick={() => handleOnClickSkillPresentBox("openBox")}>
          {refs.skillPresentBox.current["isCategoryOpened"] ? (
            <CloseIcon></CloseIcon>
          ) : (
            <HighlightIcon></HighlightIcon>
          )}
        </SkillBoxOpener>
        <SkillCategory
          className="front-end"
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}>
          <div className="title">FRONTEND</div>
          {refs.skillPresentBox.current["isCategoryReady"] && (
            <div className="body">
              {icons.front.map((icon) => {
                return (
                  <img
                    key={icon}
                    className="skillIcon"
                    src={icons.path + icon}
                    alt={icon}></img>
                );
              })}
            </div>
          )}
        </SkillCategory>
        <SkillCategory
          className="back-end"
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}>
          <div className="title">BACKEND</div>
          {refs.skillPresentBox.current["isCategoryReady"] && (
            <div className="body">
              {icons.back.map((icon) => {
                return (
                  <img
                    key={icon}
                    className="skillIcon"
                    src={icons.path + icon}
                    alt={icon}></img>
                );
              })}
            </div>
          )}
        </SkillCategory>
        <SkillCategory
          className="other"
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}>
          <div className="title">OTHERS</div>
          {refs.skillPresentBox.current["isCategoryReady"] && (
            <div className="body">
              {icons.other.map((icon) => {
                return (
                  <img
                    key={icon}
                    className="skillIcon"
                    src={icons.path + icon}
                    alt={icon}></img>
                );
              })}
            </div>
          )}
        </SkillCategory>
      </SkillsPresentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SkillsPresentBox = styled.nav.attrs(() => ({}))<any>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 5.2rem;
  height: 5.2rem;
  margin: auto;

  & > * {
    position: absolute;

    width: 5rem;
    height: 5rem;

    border: none;
    border-radius: 100%;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.12);

    cursor: pointer;
  }
`;

const SkillBoxOpener = styled.nav.attrs(() => ({}))<any>`
  z-index: 2;
  left: 0;

  background-color: white;

  transition: all 0.3s ease;
  transform: translate(0, 0) scale(1.02);

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    ${(p) => {
      if (!p.isBoxOpened) {
        return css`
          transform: translate(0, 0) scale(1.4);
        `;
      } else if (p.isCategoryOpened) {
        return css`
          transform: translate(0, 0) scale(1.4);
        `;
      }
    }}
  }

  ${(p) => {
    if (p.isBoxOpened) {
      return css`
        ${p.trajectory.opener};
      `;
    }
  }}
`;

const SkillCategory = styled.nav.attrs(() => ({}))<any>`
  z-index: 1;

  transition: all 0.3s ease;
  transform: translate(0, 0);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &.front-end {
    background-color: #11698e;

    ${(p) => {
      if (p.isBoxOpened) {
        return css`
          ${p.trajectory.front};
        `;
      }
    }}
  }

  &.back-end {
    background-color: #19456b;

    ${(p) => {
      if (p.isBoxOpened) {
        return css`
          ${p.trajectory.back};
        `;
      }
    }}
  }

  &.other {
    background-color: #16c79a;

    ${(p) => {
      if (p.isBoxOpened) {
        return css`
          ${p.trajectory.other};
        `;
      }
    }}
  }

  ${(p) => {
    if (p.isBoxOpened) {
      return css`
        ${p.trajectory.common};
      `;
    }
  }}

  .title {
    position: relative;
    margin: auto;

    text-align: center;
    font-family: "Open Sans", sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: white;

    transition: all 0.3s ease;

    ${(p) => {
      if (p.isBoxOpened) {
        return css`
          ${p.trajectory.categoryTitle};
        `;
      }
    }}
  }

  .skillIcon {
    width: 4.5rem;
    height: 4.5rem;

    margin-right: 0.6rem;

    border-radius: 100%;
    object-fit: cover;

    background: white;

    transition: all 0.3s ease;
  }

  .body {
    overflow: hidden;
  }
`;
