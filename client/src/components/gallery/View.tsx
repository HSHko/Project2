import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();
  // const dispatch = useDispatch();

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
  });

  return (
    <Wrapper>
      {Object.keys(props.preProps.postQry).length || true ? (
        <>
          <ViewHeader>
            <h1>this is header</h1>
          </ViewHeader>
          <ViewBody>
            <h1> this is body </h1>
          </ViewBody>
          <ViewFooter>
            <div className="Left"></div>
            <div className="Right">
              <Button>削除</Button>
            </div>
          </ViewFooter>
        </>
      ) : (
        <>
          <h1>fail</h1>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const ViewHeader = styled.div``;

const ViewBody = styled.div``;

const ViewFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
