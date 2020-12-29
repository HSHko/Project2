import React from "react";
import { useRouter } from "next/router";

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    nextRouter.push(`/home`);
  });

  return <></>;
}
