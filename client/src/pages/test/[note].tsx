import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import Button from "atoms/Button";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  });

  const nextRouter = useRouter();

  // const dispatch = useDispatch();

  return (
    <>
      <NextLink href={`/test/page?page=17`}>
        <Button as="a">
          <h1>171717</h1>
        </Button>
      </NextLink>
      <NextLink href={`/test/page?page=26`}>
        <Button as="a">
          <h1>262626</h1>
        </Button>
      </NextLink>
      <NextLink href={`page=26`}>
        <Button as="a">
          <h1>262626</h1>
        </Button>
      </NextLink>
      <h1>Script</h1>
      <h1>
        nextRouter.query.note: {nextRouter.query.note} <br />
        nextRouter.query.page: {nextRouter.query.page} <br />
        nextRouter.pathname: {nextRouter.pathname} <br />
      </h1>
    </>
  );
}
