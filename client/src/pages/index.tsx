import React from "react";

// Communication stuff
// import axios from 'axios';
// import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

// Redux stuff
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Components
import Home from "components/home/Home";

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });
  // const dispatch = useDispatch();

  return (
    <>
      <Home></Home>
    </>
  );
}

// const Wrapper = styled.div``;

// export async function getServerSideProps() {
//   return { props: { msg: `ssr: ` } };
// }
