import React from "react";
import styled from "styled-components";
import { isContext } from "vm";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";
import { store } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();
  // const dispatch = useDispatch();

  const [commentsData, setCommentsData] = React.useState<any>([]);

  const refs = {
    newCommentBody: React.useRef<any>(""),
    isFetching: React.useRef<boolean>(false),
  };

  const isAuthenticated = useSelector(
    (x: RootState) => x.userReducer.isAuthenticated,
    shallowEqual,
  );

  const credentials = useSelector(
    (x: RootState) => x.userReducer.credentials,
    shallowEqual,
  );

  React.useEffect(() => {
    if (props.preProps.postData.status !== `disabled`) {
      getCommentsOfPage();
    }
  }, []);

  const getCommentsOfPage = React.useCallback(() => {
    if (refs.isFetching.current) return;
    refs.isFetching.current = true;
    (async function () {
      try {
        const commentsQry = await axios.get(
          `/api/comments/getcommentsfrompost/${nextRouter.query.idx}`,
        );
        // console.log(commentsQry.data);
        // console.log(JSON.stringify(commentsQry.data));
        // console.log(JSON.parse(JSON.stringify(commentsQry.data)));
        setCommentsData(commentsQry.data);
      } catch (err) {
        console.error(err);
        const res = err.response.data;

        if (res.body_length) alert(`4文字以上入力してください`);
        if (res.fbAuth) alert(`ログインが必要です。`);
      } finally {
        refs.isFetching.current = false;
      }
    })();
  }, []);

  const handleOnClickSubmit = React.useCallback(() => {
    if (refs.isFetching.current) return;
    refs.isFetching.current = true;
    (async function () {
      try {
        const reqData = {
          body: refs.newCommentBody.current.value,
        };

        await axios.post(
          `/api/comments/addcommenttopost/${nextRouter.query.idx}`,
          reqData,
        );

        console.log(`comment added to ${nextRouter.query.idx}`);
        getCommentsOfPage();
      } catch (err) {
        console.error(err);
        const res = err.response.data;
        if (res.fb_auth) alert(`ログインが必要です`);
      } finally {
        refs.isFetching.current = false;
      }
    })();
  }, []);

  return (
    <Wrapper>
      <ScreamdCommentsArea>
        {commentsData.map((comment, idx) => (
          <CommentBlock key={idx}>
            <div className="donor">{comment.donor}</div>
            <div className="body">{comment.body}</div>
            <div className="created_at">{comment.created_at}</div>
          </CommentBlock>
        ))}
      </ScreamdCommentsArea>
      <NewCommentArea>
        <DonorBox>
          {isAuthenticated ? credentials.sign_id : `ログインが必要です`}
        </DonorBox>
        <InputBox>
          <textarea
            ref={refs.newCommentBody}
            className="comment-body"
            placeholder="コメントを入力してください"></textarea>
          <Button className="submit-comment" onClick={handleOnClickSubmit}>
            登録
          </Button>
        </InputBox>
      </NewCommentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 0.2rem 0.5rem;
`;

const ScreamdCommentsArea = styled.div`
  margin: 0.2rem 0;
  border-top: 1px solid ${colors.border.light};
  display: flex;
  flex-direction: column;
`;

const CommentBlock = styled.div`
  border-bottom: 1px solid ${colors.border.light};
  display: flex;
  align-items: center;

  & .donor {
    width: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 2rem;

    opacity: 0.9;
  }

  & .body {
    flex-grow: 100;
  }

  & .created_at {
    width: 6rem;
    opacity: 0.7;
  }
`;

const NewCommentArea = styled.div`
  border-top: 2px solid ${colors.deeppurple[3]};
  border-bottom: 2px solid ${colors.deeppurple[3]};
  padding: 0.4rem 1rem;

  display: flex;
  align-items: flex-start;

  background-color: ${colors.gray[3]};
`;

const DonorBox = styled.div`
  width: 12rem;
  margin: 0 0.4rem;
  padding: 0.4rem;
  border: 1px solid ${colors.border.main};

  background-color: ${colors.gray[1]};
`;

const InputBox = styled.div`
  flex-grow: 100;
  margin: 0 0.4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & textarea {
    width: 100%;
    height: 6rem;
  }

  & .submit-comment {
    margin-top: 0.4rem;
    margin-left: auto;

    padding: 0.4rem 2rem;
  }
`;
