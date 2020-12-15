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
      <img className="t1" src={`/images/0y0.jpg`} alt="" height="400" width="400"></img>
      <img className="t2" src={`/images/0a0.jpg`}></img>
      <img className="t3" src={`/images/0b0.jpg`}></img>
      <img className="t4" src={`/images/0c0.jpg`}></img>
    </>
  );
}

// const Wrapper = styled.div``;

// export async function getServerSideProps() {
//   return { props: { msg: `ssr: ` } };
// }
