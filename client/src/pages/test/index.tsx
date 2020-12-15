import React from "react";
// import styled from "styled-components";
import NextLink from "next/link";
// import axios from 'axios';
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";
import NextRouter from "next/router";

// https://nextjs.org/docs/basic-features/data-fetching
// getStaticProps (Static Generation): Fetch data at build time.
// getStaticPaths (Static Generation): Specify dynamic routes to pre-render based on data.
// getServerSideProps (Server-side Rendering): Fetch data on each request.
// In addition, we’ll talk briefly about how to fetch data on the client side.

// If you export an async function called getStaticProps from a page,
// Next.js will pre - render this page at build time using the props returned by getStaticProps.
// export async function getStaticProps(context) {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }

import Button from "atoms/Button";

const notes = [
  { name: "my-note" },
  { name: "my-note2" },
  { name: "another-note" },
];

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
    console.log({ test: props.test });
  });

  return (
    <>
      <h1>Script</h1>
      <NextLink href={`/test/page?=1`}>
        <Button as="a">
          <h1>Dynamic page Moving Test</h1>
        </Button>
      </NextLink>
      {notes.map((note) => {
        return (
          <div key={note.name}>
            <button
              onClick={() =>
                NextRouter.push(`/test/[note]`, `/test/${note.name}`, {
                  shallow: true,
                })
              }>
              {note.name}
            </button>
          </div>
        );
      })}
      {notes.map((note) => {
        return (
          <div key={note.name}>
            <NextLink href={`/test/[note]`} as={`/test/${note.name}`}>
              <a>{note.name}</a>
            </NextLink>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  return {};
}
