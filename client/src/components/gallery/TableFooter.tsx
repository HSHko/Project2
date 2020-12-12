import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
import Button from "atoms/Button";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();

  // React.useEffect(() => {
  //   // console.log(nextRouter.pathname);
  // });

  // const dispatch = useDispatch();
  // const nextRouter = useRouter();

  const handleOnClickWrite = React.useCallback(() => {
    NextRouter.push("/gallery/write");
  }, []);

  return (
    <Wrapper>
      <div className="Left"></div>
      <div className="Right">
        <Button
          margin="0"
          borderRadius="none"
          shadow="none"
          onClick={() => handleOnClickWrite()}>
          Write
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.33rem;
`;
