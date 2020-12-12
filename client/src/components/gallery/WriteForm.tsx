import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";
import { uiAction } from "store";

// Components
import Button from "atoms/Button";
import WriteForm from "components/gallery/WriteForm";

// interface Props {}

export default function fun(props) {
  // const nextRouter = useRouter();

  const refs = {
    writeTitle: React.useRef<any>(""),
    writeBody: React.useRef<any>(""),
  };

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  const isLoading = useSelector(
    (x: RootState) => x.uiReducer.isHi,
    shallowEqual,
  );

  React.useEffect(() => {
    // if (!isAuthenticated) {
    //   alert("書き込みにはログインが必要です。");
    //   NextRouter.push("/join/signin");
    // }
  }, [isAuthenticated]);

  const dispatch = useDispatch();
  // const nextRouter = useRouter();

  const handleOnClickWrite = React.useCallback(async () => {
    try {
      dispatch(uiAction.hi());

      const userDetailsQry = await axios.post("api/users/userdetails");
      const reqData = {
        category: "normal",
        title: refs.writeTitle.current.value,
        body: refs.writeBody,
        doner: userDetailsQry.data.uid,
      };

      await axios.post("api/posts/addpost", {
        data: reqData,
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(uiAction.lo());
    }
  }, []);

  return (
    <Wrapper>
      <input
        className="TitleText"
        type="text"
        placeholder="タイトルを入力してください"></input>
      <textarea
        className="BodyText"
        placeholder="内容を入力してください"
        ref={refs.writeBody}></textarea>
      <WriteFooter>
        <div className="Left"></div>
        <div className="Right">
          <Button onClick={() => handleOnClickWrite()} disabled={isLoading}>
            Write
          </Button>
        </div>
      </WriteFooter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;

  & > {
    &.TitleText {
      width: 100%;
      border: 3px solid green;
      height: 2rem;
    }

    &.BodyText {
      width: 100%;
      border: 3px solid red;
      margin-top: 0.5rem;
      height: 20rem;
    }
  }
`;

const WriteFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
