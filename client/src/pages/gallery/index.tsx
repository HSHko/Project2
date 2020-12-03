import React from "react";
// import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import Link from "next/link";
import { useRouter } from "next/router";

// Material-ui stuff
import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
  });

  // const dispatch = useDispatch();

  return (
    <>
      <h1>GALLERY</h1>
      <Grid container spacing={8}></Grid>
    </>
  );
}

// const Wrapper = styled.div``;

// const dispatch = useDispatch();

//   return (
//     <>
//       <h1>Blog</h1>
//       <Grid container spacing={8}>
//         <Grid item sm={8} xs={12}>
//           <p>Content...</p>
//         </Grid>
//         <Grid item sm={4} xs={12}>
//           <p>Profile...</p>
//         </Grid>
//         <Grid item xs={12}>
//           {loading ? <p>loading...</p> : <p>xxxxxxxxxxxx</p>}
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// const Wrapper = styled.div``;

// const getScreams = async () => {
//   try {
//     const screamQry = await axios.get("/api/screams");
//     setScreams(screamQry.data);
//   } catch (err) {
//     console.error("getScreams failed");
//   }
// };

// console.log(screams);

// React.useEffect(() => {
//   console.log("render");
//   getScreams();
//   setLoading(false);
// }, []);
