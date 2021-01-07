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
import List from "components/community/List";

// interface Props {}

export default function fun(props) {
  return (
    <Wrapper>
      <List></List>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

// export async function getServerSideProps(context) {
//   let preProps = {
//     postsData: null,
//   };

//   try {
//     const postsQry = await fetch(
//       `${process.env.BASE_URL}/api/posts/getposts/${context.query.page}`,
//       {
//         method: "GET",
//       },
//     );
//     if (!postsQry.ok) throw { errors: await postsQry.json() };
//     const postsData = await postsQry.json();

//     preProps.postsData = postsData;
//   } catch (err) {
//     // console.error(err);
//   }

//   return { props: { preProps } };
// }
