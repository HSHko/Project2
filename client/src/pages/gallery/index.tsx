import React from "react";
import styled from "styled-components";

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
import * as table from "./skeleton";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();

  React.useEffect(() => {
    console.log(nextRouter.pathname);
    console.log(table.posts.map((el) => el));
  });

  // const dispatch = useDispatch();

  return (
    <>
      <h1>GALLERY</h1>
      <Wrapper>
        <Table>
          <thead>
            <tr>
              {Object.entries(table.head).map((el) => {
                return (
                  <th key={el[0]} className={el[0]}>
                    {el[1]}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {table.posts.map((el) => {
              return (
                <tr key={el.uid}>
                  <td>{el.uid}</td>
                  <td>{el.title}</td>
                  <td>{el.doner}</td>
                  <td>{el.created_at}</td>
                  <td>{el.like_cnt}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  border: 3px dotted red;
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid cyan;
  border-collapse: collapse;

  th,
  td {
    text-align: center;
    border-bottom: 1px solid green;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  th {
    border-top: 1px solid red;
  }

  th.uid {
    width: 5rem;
  }
  th.title,
  td.title {
    width: 7rem;
  }
  th.created_at {
    width: 5rem;
  }
  th.doner {
    width: 5rem;
  }
  th.like_cnt {
    width: 5rem;
  }
`;

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
