import React from "react";

// Communication stuff
// import axios from 'axios';
// import Link from "next/link";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import axios from "axios";

// Redux stuff
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components

export default function fun(props) {
  const nextRouter = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });
  // const dispatch = useDispatch();

  return (
    <>
      <h1>Home!</h1>
      <img
        className="t1"
        src={`/images/0y0.jpg`}
        alt=""
        height="400"
        width="400"></img>
    </>
  );
}

// const Wrapper = styled.div``;

// export async function getServerSideProps() {
//   return { props: { msg: `ssr: ` } };
// }
