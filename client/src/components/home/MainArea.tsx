import React from "react";
import styled from "styled-components";

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

const backgroundImages = {
  path: `/images/home/background/`,
  images: [`coffee.jpg`, `office.jpg`, `wood.jpg`],
};

export default function fun(props) {
  const [titleBodyText, setTitleBodyText] = React.useState("");

  React.useEffect(() => {
    const text = "I'm a preliminary @Web Developer;";
    let pos = 0;
    let msg = "";
    let timer = setInterval(() => {
      if (pos >= text.length) {
        clearInterval(timer);
        return;
      }

      if (text[pos] === "@") {
        msg += "\n";
      } else {
        msg += text[pos];
      }
      pos += 1;

      setTitleBodyText(msg);
    }, 80);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Wrapper>
      <img
        className="mainBg b0"
        src={`${backgroundImages.path}${backgroundImages.images[0]}`}
        alt=""></img>
      <img
        className="mainBg b1"
        src={`${backgroundImages.path}${backgroundImages.images[1]}`}
        alt=""></img>
      <img
        className="mainBg b2"
        src={`${backgroundImages.path}${backgroundImages.images[2]}`}
        alt=""></img>
      <HomeTitle>
        <div className="titleHeader">HAN SAHYEON</div>
        <div className="titleBody">{titleBodyText}</div>
        <div className="titleFooter">for React</div>
      </HomeTitle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .mainBg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;

    animation: fade 15s ease-in-out 0s infinite forwards;
    &.b0 {
      animation-delay: -3s;
    }
    &.b1 {
      animation-delay: -8s;
    }
    &.b2 {
      animation-delay: -13s;
    }

    @keyframes fade {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      33% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 0;
      }
    }
  }
`;

const HomeTitle = styled.div`
  position: relative;
  display: inline-block;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  font-family: "Open Sans", sans-serif;
  color: white;

  .titleHeader {
    text-align: left;
    font-size: 1.25rem;
  }

  .titleBody {
    min-height: 15rem;
    min-width: 23rem;

    font-size: 5rem;
    letter-spacing: 5px;
    font-weight: 700;
    white-space: pre-wrap;
  }

  .titleFooter {
    text-align: right;
    font-size: 1.5rem;
  }
`;
