import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
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
import List from "components/gallery/List";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
    // console.log(nextRouter.query);
  });

  // const dispatch = useDispatch();

  return (
    <>
      <h1>GALLERY</h1>
      <Wrapper>
        <List preProps={props.preProps} routeName="/gallery"></List>
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

export async function getServerSideProps(context) {
  let preProps = {
    postsQry: [],
  };

  try {
    const postsQry = await fetch(
      `${process.env.baseUrl}/api/posts/getposts/${context.query.page}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());
    if (!postsQry.errors) preProps.postsQry = postsQry;
  } catch (err) {
    console.error(err);
  }

  console.log({ preProps: preProps });

  return { props: { preProps } };
}
