import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import WarningIcon from "@material-ui/icons/Warning";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import ViewPost from "./ViewPost";
import ViewComment from "./ViewComment";
import { colors } from "styles/theme";

export default function fun(props) {
  React.useEffect(() => {}, []);
  return (
    <Wrapper>
      <CommunityTitle>COMMUNITY</CommunityTitle>

      {props.ssp && props.ssp.postData ? (
        <PostWrapper>
          <ViewPost ssp={props.ssp}></ViewPost>
          <ViewComment></ViewComment>
        </PostWrapper>
      ) : (
        <ViewError>
          <WarningIcon style={{ fontSize: "7em", color: "red" }}></WarningIcon>
          <br />
          <h1>存在しないページ、または削除されたページです。</h1>
        </ViewError>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const PostWrapper = styled.div`
  border: 1px solid ${colors.border.main};
  padding: 0.8rem;
`;

const CommunityTitle = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
`;

const ViewError = styled.div`
  margin: 4em 0;

  text-align: center;
`;
