import React from "react";
import styled, { css } from "styled-components";
import { useInView } from "react-intersection-observer";

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
import { vars } from "styles/theme";
import { icons } from "./tooltips";

export default function fun(props) {
  const [renderer, setRenderer] = React.useState(false);
  const [isGuideHi, setIsGuideHi] = React.useState(true);
  const [guideCountdown, setGuideCountdown] = React.useState(5);
  const [slideFlicker, setSlideFlicker] = React.useState(false);

  const [inViewRef, inView] = useInView({
    rootMargin: "500px 0px",
  });

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

  // inView内に入った時、ガイドバブルのカウントダウンを開始
  React.useEffect(() => {
    if (!inView) return;

    let start = 5;
    let now = start;
    setGuideCountdown(start);

    let timer = setInterval(() => {
      if (now <= 0 || refs.skillPresentBox.current["isOnProgress"]) {
        handleOnClickSkillPresentBox("openBox");
        clearInterval(timer);
        setIsGuideHi(false);
        return;
      }

      now--;
      setGuideCountdown(now);
      setSlideFlicker(true);
      setSlideFlicker(false);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [inView]);

  React.useEffect(() => {}, [guideCountdown]);

  const handleOnClickSkillPresentBox = React.useCallback(
    async (target) => {
      if (refs.skillPresentBox.current["isOnProgress"]) return;
      refs.skillPresentBox.current["isOnProgress"] = true;

      switch (target) {
        case "openBox":
          setIsGuideHi(false);

          // ボックスが開いている場合は、閉じて初期化する
          if (refs.skillPresentBox.current["isBoxOpened"]) {
            refs.skillPresentBox.current["isBoxOpened"] = false;
            refs.skillPresentBox.current["isCategoryOpened"] = false;
            refs.skillPresentBox.current["isCategoryReady"] = false;
            refs.skillPresentBox.current["trajectory"] = {};
            setRenderer(!renderer);
          } else {
            refs.skillPresentBox.current["isBoxOpened"] = true;

            // カテゴリーの円を拡散させる
            const circleDist = 8;
            refs.skillPresentBox.current["trajectory"] = {
              ...refs.skillPresentBox.current["trajectory"],
              front: `transform: translate(0, ${-1.414 * circleDist}rem);`,
              back: `transform: translate(${circleDist}rem, ${circleDist}rem);`,
              other: `transform: translate(${-circleDist}rem, ${circleDist}rem);`,
            };
            setRenderer(!renderer);

            // 各カテゴリーを移動させ、四角型に広げる
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

            // 間を入れてカテゴリーの各アイコンが乱雑にtransitionすることを防止する
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

  return (
    <Wrapper ref={refs.componentWrapper}>
      <SkillsPresentBox
        ref={(el) => (refs.skillPresentBox.current["canvas"] = el)}>
        {isGuideHi && (
          <GuideBubble ref={inViewRef}>
            <h1>
              現在の技術スタックについての紹介です{`\n`}
              {!slideFlicker && (
                <Slider padding={"2rem 1rem"}>
                  <div>{guideCountdown}</div>
                </Slider>
              )}
              秒後、または
              <Slider padding={"2rem 4rem"}>
                <div>クリック</div>
              </Slider>
              で開きます。
            </h1>
          </GuideBubble>
        )}

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
          className="frontend"
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}>
          <div className="title">FRONTEND</div>
          {refs.skillPresentBox.current["isCategoryReady"] && (
            <div className="body">
              {Object.entries(icons.front).map((icon) => {
                return (
                  <ImageWithTooltip key={icon[0]}>
                    <img
                      className="skillIcon"
                      src={icons.path + icon[0]}
                      alt={icon[0]}></img>
                    <div className="tooltip">{icon[1]}</div>
                  </ImageWithTooltip>
                );
              })}
            </div>
          )}
        </SkillCategory>
        <SkillCategory
          className="backend"
          trajectory={refs.skillPresentBox.current["trajectory"]}
          isBoxOpened={refs.skillPresentBox.current["isBoxOpened"]}
          isCategoryOpened={refs.skillPresentBox.current["isCategoryOpened"]}>
          <div className="title">BACKEND</div>
          {refs.skillPresentBox.current["isCategoryReady"] && (
            <div className="body">
              {Object.entries(icons.back).map((icon) => {
                return (
                  <ImageWithTooltip key={icon[0]}>
                    <img
                      className="skillIcon"
                      src={icons.path + icon[0]}
                      alt={icon[0]}></img>
                    <div className="tooltip">{icon[1]}</div>
                  </ImageWithTooltip>
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
              {Object.entries(icons.other).map((icon) => {
                return (
                  <ImageWithTooltip key={icon[0]}>
                    <img
                      className="skillIcon"
                      src={icons.path + icon[0]}
                      alt={icon[0]}></img>
                    <div className="tooltip">{icon[1]}</div>
                  </ImageWithTooltip>
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
  left: 50%;
  width: 100%;
  max-width: ${vars.maxWidth.main};
  height: 100%;

  transform: translate(-50%, 0);
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
`;

const GuideBubble = styled.section.attrs(() => ({}))<any>`
  position: absolute;
  top: 10rem;
  left: 50%;
  display: inline-block;
  transform: translate(-50%, 0);
  padding: 2rem;
  padding-top: 4rem;

  background-color: white;
  border-radius: 10px;

  word-break: keep-all;
  white-space: pre;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;

    transform: translate(-30px, -30px);
    border-bottom: 30px solid white;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
  }

  p {
    position: relative;
    display: inline-block;

    color: red;
    font-size: 1.6em;
  }
`;

const Slider = styled.div.attrs(() => ({}))<{
  padding: string;
}>`
  position: relative;
  display: inline-block;
  padding: ${(p) => p.padding};
  padding-bottom: 0;

  div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    font-size: 1.8rem;
    color: red;

    animation: sliderAnime 0.5s ease 0s 1 forwards;
    @keyframes sliderAnime {
      from {
        transform: translate(-50%, -50%);
      }
      to {
        transform: translate(-50%, -15%);
      }
    }
  }
`;

const SkillBoxOpener = styled.nav.attrs(() => ({}))<any>`
  position: absolute;
  z-index: 2;
  left: 0;

  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 100%;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.12);

  cursor: pointer;

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
  position: absolute;
  z-index: 1;

  width: 5rem;
  height: 5rem;
  border: none;
  border-radius: 100%;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.12);

  transition: all 0.3s ease;
  transform: translate(0, 0);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &.frontend {
    background-color: #11698e;

    ${(p) => {
      if (p.isBoxOpened) {
        return css`
          ${p.trajectory.front};
        `;
      }
    }}
  }

  &.backend {
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
        position: absolute;
        z-index: 0;
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
    transform: scale(1);

    &:hover {
      transform: scale(1.4);
    }
  }

  .body {
  }
`;

const ImageWithTooltip = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;

  display: inline-block;
  margin-right: 1rem;
  border-radius: 100%;

  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    transform: scale(1);

    cursor: pointer;
  }

  .tooltip {
    position: absolute;
    z-index: 17;
    top: -1rem;
    left: calc(100% + 2.5rem);

    min-width: 18rem;

    overflow-wrap: break-word;

    display: none;
    padding: 1.6rem;
    background-color: brown;

    color: white;
    text-align: left;

    &::after {
      content: "";
      position: absolute;
      z-index: 17;
      top: 30%;
      left: 0%;
      transform: translate(-15px, 0px);

      border-right: 15px solid brown;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    }

    animation: tooltipAnime 0.5s ease 0s 1 forwards;
    @keyframes tooltipAnime {
      from {
        opacity: 0.2;
        transform: translate(0, -25px);
      }
      to {
        opacity: 1;
        transform: translate(0, 0);
      }
    }
  }

  &:hover {
    img {
      transform: scale(1.4);
    }

    .tooltip {
      display: inline-block;
    }
  }
`;
