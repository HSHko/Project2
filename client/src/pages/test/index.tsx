import React from "react";
import styled, { css } from "styled-components";
import { useInView } from "react-intersection-observer";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";
import Overlay from "atoms/Overlay";

export default function fun(props) {
  const [ref, inView] = useInView({
    rootMargin: "-350px 0px",
  });

  React.useEffect(() => {
    console.log({
      ref: ref,
    });
  }, []);

  const timeTimer = React.useMemo(() => {}, []);

  return (
    <Wrapper>
      <Inner>
        <img src="/images/home/icons/cpp.png" alt="" className="test"></img>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;

  width: 100%;
  height: 300vh;
`;

const Inner = styled.div.attrs(() => ({}))<any>`
  position: relative;
  width: 100%;
  height: 80vh;

  background-color: darkblue;

  img {
    width: 50%;
    height: 100%;
    object-fit: cover;
  }
`;
