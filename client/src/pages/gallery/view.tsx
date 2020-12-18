import React from "react";

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
import View from "components/gallery/View";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  }, []);

  // const dispatch = useDispatch();
  // const nextRouter = useRouter();

  return (
    <>
      <View preProps={props.preProps}></View>
    </>
  );
}

export async function getServerSideProps(context) {
  let preProps = {
    postData: null,
  };

  try {
    const postQry = await fetch(
      `${process.env.baseUrl}/api/posts/getpost/${context.query.idx}`,
      {
        method: "GET",
      },
    );
    if (!postQry.ok) throw { errors: await postQry.json() };
    const postData = await postQry.json();

    if (postData.status === "disabled") throw { error: "disabled post" };

    preProps.postData = postData;
  } catch (err) {
    // console.error(err);
  }
  return { props: { preProps } };
}
