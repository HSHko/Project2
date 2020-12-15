import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import { colors } from "styles/theme";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();
  // const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
  });

  return (
    <Wrapper>
      <h1>this is footer.</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  margin-top: 3rem;
  border-top: 1px solid ${colors.gray[5]};
  padding-top: 2rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
