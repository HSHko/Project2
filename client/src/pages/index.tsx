import React from "react";

// Communication stuff
// import axios from 'axios';
// import Link from "next/link";
import { useRouter } from "next/router";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

// Components

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });
  // const dispatch = useDispatch();

  return (
    <>
      <h1>Home!</h1>
    </>
  );
}

// const Wrapper = styled.div``;

// export async function getServerSideProps() {
//   return { props: { msg: `ssr: ` } };
// }
