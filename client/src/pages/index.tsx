import React from "react";
import { useRouter } from "next/router";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NextLink from "next/link";

// Components
import NavBar from "components/navigation/NavBar";
import Dialog from "components/Dialog";
import Blog from "pagesSPA/blog";

export default function fun(props) {
  const router = useRouter();
  React.useEffect(() => {
    console.log(props.msg + router.pathname);
  });
  // const dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <Dialog></Dialog>
        <NavBar></NavBar>
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/blog" component={Blog}></Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

// const Wrapper = styled.div``;

export async function getServerSideProps() {
  return { props: { msg: `ssr: ` } };
}
