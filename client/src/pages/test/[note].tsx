import React from "react";
// import styled from "styled-components";
// import Link from "next/link";
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";
import { useRouter } from "next/router";

/*
interface Props {

}
*/

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });

  const router = useRouter();

  // const dispatch = useDispatch();

  return (
    <>
      <h1>Script</h1>
      <h1>this is a test {router.query.note}</h1>
    </>
  );
}
