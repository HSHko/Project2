import React from "react";
// import styled from "styled-components";
import Link from "next/link";
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";
import Router from "next/router";
/*
interface Props {

}
*/

const notes = [{ name: "my-note" }, { name: "my-note2" }, { name: "another-note" }];

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });

  return (
    <>
      <h1>Script</h1>
      {notes.map(note => {
        return (
          <div key={note.name}>
            <button
              onClick={() => Router.push(`/test/[note]`, `/test/${note.name}`, { shallow: true })}
            >
              {note.name}
            </button>
          </div>
        );
      })}
      {notes.map(note => {
        return (
          <div key={note.name}>
            <Link href={`/test/[note]`} as={`/test/${note.name}`}>
              <a>{note.name}</a>
            </Link>
          </div>
        );
      })}
    </>
  );
}
