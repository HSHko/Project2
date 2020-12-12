import React from "react";

// Communication Stuff
import { useRouter } from "next/router";

// Components
import Navbar from "components/navigation/Navbar";
import Backdrop from "blocks/Backdrop";
import LoadingUi from "components/LoadingUi";

// 참고: nextjs에서 navigation bar 만들기
// https://github.com/mukeshphulwani66/mystore2021-Ecommerce-nextjs/blob/master/components/Layout.js

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  }, []);

  return (
    <>
      <LoadingUi></LoadingUi>
      <Backdrop></Backdrop>
      <Navbar></Navbar>
      {props.children}
    </>
  );
}
