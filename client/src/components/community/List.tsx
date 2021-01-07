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
import Button from "atoms/Button";
import { colors } from "styles/theme";
import skeleton from "./listSkeleton";
import ListTable from "./ListTable";

export default function fun(props) {
  return (
    <Wrapper>
      <CommunityTitle>COMMUNITY</CommunityTitle>
      <ListTable></ListTable>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 90%;
  margin: 0 auto;
`;

const CommunityTitle = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
`;
