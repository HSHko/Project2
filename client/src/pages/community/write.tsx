import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff

// Redux stuff
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";

// Components
import Write from "components/community/Write";

export default function fun(props) {
  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  React.useEffect(() => {
    if (!isAuthenticated) {
      NextRouter.push("/join/signin");
      alert("書き込みにはログインが必要です。");
    }
  }, []);

  return (
    <Wrapper>
      <Write></Write>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;
