import React from "react";
import styled from "styled-components";

// Communication Stuff
import { useRouter } from "next/router";

// Components
import Navbar from "components/navigation/Navbar";
import Sidebar from "components/navigation/Sidebar";
import Footer from "components/footer/Footer";
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
      <Sidebar></Sidebar>
      <OuterWrapper pathname={nextRouter.pathname}>
        {props.children}
      </OuterWrapper>
      {nextRouter.pathname !== "/home" && <Footer></Footer>}
    </>
  );
}

const OuterWrapper = styled.div.attrs(() => ({}))<any>`
  position: relative;
  z-index: 0;
  width: 100%;
  max-width: ${(p) => {
    if (p.pathname === "/home") {
      return `none`;
    } else {
      return p.theme.vars.maxWidth.main;
    }
  }};
  margin: 0 auto;
`;
