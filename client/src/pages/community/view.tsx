import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
import { useRouter } from "next/router";

// Material-ui stuff

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import View from "components/community/View";

// interface Props {}

export default function fun(props) {
  return (
    <Wrapper>
      <View ssp={props.ssp}></View>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export async function getServerSideProps(context) {
  let ssp = {
    postData: null,
  };

  try {
    const dataQry = await fetch(
      `${process.env.BASE_URL}/api/posts/getpost/${context.query.idx}`,
      {
        method: "GET",
      },
    );
    if (!dataQry.ok) throw { errors: await dataQry.json() };
    const data = await dataQry.json();

    ssp = { ...data };
  } catch (err) {
    // console.error(err);
  }
  return { props: { ssp } };
}
