import React from "react";
// import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import Link from "next/link";

const ProfileLink = props => (
  <div>
    <Link href={`/profile?name=${props.name}`}>
      <a>Go to {props.name}'s profile</a>
    </Link>
  </div>
);

export default function fun(props) {
  console.log("init");
  // const dispatch = useDispatch();

  return (
    <>
      <h1>Script</h1>

      <Link href={`/profile?name=${props.name}`}>
        <a>Go to {props.name}'s profile</a>
      </Link>
    </>
  );
}

// const Wrapper = styled.div``;
