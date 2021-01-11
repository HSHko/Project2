import React from "react";
import styled, { css } from "styled-components";
import { useInView } from "react-intersection-observer";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';

const bgImage = "/images/home/background/desk.jpg";

export default function fun(props) {
  const [years, setYears] = React.useState(0);

  const [inViewRef, inView] = useInView({
    rootMargin: "-300px 0px",
  });

  React.useEffect(() => {
    if (!inView) return;
    setYears(0);
    let cnt = 0;
    let max = 2;

    let timer = setInterval(() => {
      if (cnt >= max) {
        clearInterval(timer);
        return;
      }
      cnt += 1;
      setYears(cnt);
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, [inView]);

  return (
    <Wrapper ref={inViewRef}>
      <BgOverAll
        inView={inView}
        src={bgImage}
        alt="background_image"></BgOverAll>
      <ContentWrapper>
        <section className="experience">
          <div className="header">
            <div className="year">{years}</div>
            <div className="plus">+</div>
          </div>
          <div className="body">
            <h2>
              Years <br />
              Programming <br />
              Experience <br />
              Working
            </h2>
          </div>
        </section>
        <section className="content">
          <div className="header">
            はじめまして。Webプログラマーを目指しているハンです。
          </div>
          <div className="body">
            <span>
              <h3>React</h3>
              <p>
                ウェブサイト作成のため、プロントエンドライブラリのReactを勉強してきました。
                <br />
                このサイトはReactを基盤とするNextJSで作られています。
              </p>
            </span>
            <span>
              <h3>プログラミング</h3>
              <p>
                現在、仕事ではC++を利用した組み込み製品のソフトの開発をしています。
                <br />
              </p>
            </span>
          </div>
        </section>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  z-index: -1;
  width: 100%;
  height: 100%;

  overflow: hidden;

  background-color: black;
`;

const BgOverAll = styled.img.attrs(() => ({}))<any>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;

  opacity: 0.3;

  transition: 2s all ease;
  transform: scale(1.5);

  ${(p) => {
    if (p.inView) {
      return css`
        transition: 10s all ease;
        transform: scale(1);
      `;
    }
  }}
`;

const ContentWrapper = styled.article`
  position: relative;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  display: inline-flex;
  flex-direction: row;

  font-family: "Open Sans", sans-serif;
  color: white;

  section.experience {
    margin-right: 3.5rem;

    .header {
      color: crimson;
      display: flex;
      flex-direction: row;

      font-weight: 700;

      div.year {
        font-size: 6.5rem;
      }
      div.plus {
        margin-top: 0.5rem;
        font-size: 2.5rem;
      }
    }
    .body {
      line-height: 1.8;
    }
  }
  section.content {
    display: flex;
    flex-direction: column;

    font-size: 1.3rem;

    .header {
      font-family: sans-serif;
      font-size: 1.4em;
      font-weight: 700;
      margin-top: 0.5rem;
      margin-bottom: 2.25em;
    }
    .body {
      p {
        margin-top: 0.5em;
        margin-bottom: 2.1em;
        color: lightgray;
      }
    }
  }
`;
