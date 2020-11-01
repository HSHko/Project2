import React from "react";
import NavBar from "components/navigation/NavBar";

// 검색 : next.js navigation bar
// 참고 : https://github.com/mukeshphulwani66/mystore2021-Ecommerce-nextjs/blob/master/components/Layout.js

export default function fun(props) {
  const { children } = props;

  return (
    <>
      <NavBar></NavBar>
      {children}
    </>
  );
}
