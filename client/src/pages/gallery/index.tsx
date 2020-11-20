import React from "react";
// import styled from "styled-components";
// import Link from "next/link";
import axios from "axios";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";
import Grid from "@material-ui/core/Grid";

/*
interface Props {

}
*/

export default function fun(props) {
  const [loading, setLoading] = React.useState(true);
  const [screams, setScreams] = React.useState(null);

  const getScreams = async () => {
    try {
      const screamQry = await axios.get("/api/screams");
      setScreams(screamQry.data);
    } catch (err) {
      console.error("getScreams failed");
    }
  };

  console.log(screams);

  React.useEffect(() => {
    console.log("render");
    getScreams();
    setLoading(false);
  }, []);

  // const dispatch = useDispatch();

  return (
    <>
      <h1>Blog</h1>
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          <p>Content...</p>
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
        <Grid item xs={12}>
          {loading ? <p>loading...</p> : <p>xxxxxxxxxxxx</p>}
        </Grid>
      </Grid>
    </>
  );
}

// const Wrapper = styled.div``;
