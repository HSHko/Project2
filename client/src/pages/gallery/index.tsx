import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import Link from "next/link";
import { useRouter } from "next/router";

// Material-ui stuff
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import Table from "components/gallery/Table";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });

  // const dispatch = useDispatch();

  return (
    <>
      <h1>GALLERY</h1>
      <Wrapper>
        <Table routeName="/gallery/tests"></Table>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 3px dotted red;
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
`;
