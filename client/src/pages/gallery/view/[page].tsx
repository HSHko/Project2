import React from "react";
// import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
import { useRouter } from "next/router";

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

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });

  // const dispatch = useDispatch();
  // const nextRouter = useRouter();

  return (
    <>
      <h1>Script</h1>
      <h1>this is a test {nextRouter.query.page}</h1>
      <h2>{props.preProps.postQry.body}</h2>
    </>
  );
}

// const Wrapper = styled.div``;

export async function getServerSideProps(context) {
  let preProps = {
    postQry: null,
  };

  try {
    const postQry = await fetch(
      `${process.env.baseUrl}/api/posts/getpost?idx=${context.query.page}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());

    if (postQry.status === "disabled") throw { error: "disabled post" };
    preProps.postQry = postQry;
  } catch (err) {
    // console.error(err);
  }

  return { props: { preProps } };
}
