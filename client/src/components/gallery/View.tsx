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
import ViewComment from "./ViewComment";
import { Block, SignalWifi1BarLock } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

const skeleton = {
  status: "",
  title: "Hello, title!",
  body:
    "ックして、起動してください。インストーラが起動しますので、ウィザードに沿いセットアップをして下さい。なお、必須ファイルが古いバージョンの場合に、再起動を促されますので再起動をして下さい。＊デスクトップ等にショートカットは作成されませんので、必要に応じて[スタートメニュー]-[プログラム(XPはすべての",
  donor: "TESTMAN",
  created_at: "222222222",
  view_cnt: 10,
  like_cnt: 2,
  comment_cnt: 0,
};

interface PostState {
  status?: string;
  title: string;
  body: string;
  donor: string;
  created_at: string;
  view_cnt: number;
  like_cnt: number;
  comment_cnt: number;
}

export default function fun(props) {
  const { postData } = props.preProps;
  // const postData = skeleton;

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
    console.log({ postData: postData });
  });

  return (
    <Wrapper>
      {postData !== null ? (
        <>
          <ViewHeader>
            <HeaderTitle>
              <h3>{postData.title}</h3>
            </HeaderTitle>
            <HeaderDetails>
              <div className="left">
                {postData.donor}
                <hr style={{ display: `inline`, margin: `0 5px` }}></hr>
                {postData.created_at}
              </div>
              <div className="right">
                조회 {postData.view_cnt}
                <hr style={{ display: `inline`, margin: `0 5px` }}></hr>
                추천 {postData.like_cnt}
                <hr style={{ display: `inline`, margin: `0 5px` }}></hr>
                댓글 {postData.comment_cnt}
              </div>
            </HeaderDetails>
          </ViewHeader>
          <ViewBody>{postData.body}</ViewBody>
          <ViewFooter>
            <div className="Left"></div>
            <div className="Right">
              <Button>削除</Button>
            </div>
          </ViewFooter>
          <ViewComment></ViewComment>
        </>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const ViewHeader = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled.div``;

const HeaderDetails = styled.div`
  display: flex;
  margin: 0 5px;
  justify-content: space-between;

  & .left {
    display: flex;
  }
`;
const ViewBody = styled.div``;

const ViewFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
