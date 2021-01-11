import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import WriteWriter from "./WriteWriter";

export default function fun(props) {
  return (
    <Wrapper>
      <CommunityTitle>新しいポストの書き込み</CommunityTitle>
      <WriteWriter></WriteWriter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const CommunityTitle = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
`;
