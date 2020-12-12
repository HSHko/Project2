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
import TableFooter from "components/gallery/TableFooter";

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
        <Table preProps={props.preProps} routeName="/gallery/view"></Table>
        <TableFooter></TableFooter>
      </Wrapper>
    </>
  );
}

// <Table preProps={props.preProps} routeName="/gallery/tests"></Table>

const Wrapper = styled.div`
  border: 3px dotted red;
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
`;

export async function getServerSideProps(context) {
  let preProps = {
    postsQry: null,
  };

  try {
    const postsQry = await fetch(`${process.env.baseUrl}/api/posts/getposts`, {
      method: "GET",
    }).then((res) => res.json());
    preProps.postsQry = postsQry;
  } catch (err) {
    // console.error(err);
  }

  return { props: { preProps } };
}
