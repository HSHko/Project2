import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import CreateIcon from "@material-ui/icons/Create";

// Redux stuff
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { shallowEqual } from "react-redux";

// Components
import Button from "atoms/Button";
import LoadingIndicator from "blocks/LoadingIndicator";
import { colors } from "styles/theme";

const categories = ["一般", "情報", "その他"];

export default function fun(props) {
  const dispatch = useDispatch();

  const [isWriteOnProgress, setIsWriteOnProgress] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState(categories[0]);

  const refs = {
    postTitle: React.useRef<any>(""),
    postBody: React.useRef<any>(""),
  };

  const handleOnClickCategory = React.useCallback((target) => {
    setCurrentCategory(target);
  }, []);

  const handleOnClickReturn = React.useCallback(() => {
    NextRouter.push("/community/list");
  }, []);

  const handleOnClickWrite = React.useCallback(async () => {
    setIsWriteOnProgress(true);
    try {
      const userDetailsQry = await axios.post("/api/users/getuserdetails");

      const reqData = {
        donor: userDetailsQry.data.uid,
        category: currentCategory,
        title: refs.postTitle.current.value,
        body: refs.postBody.current.value,
      };

      await axios.post("/api/posts/createpost", {
        ...reqData,
      });

      NextRouter.push(`/community/list?page=1`);
    } catch (err) {
      console.error(err);
      let errors: any = {};
      const res = err.response.data;

      if (res.fb_auth) errors.fb_auth = "ログインが必要です";
      if (res.title)
        errors.title = "タイトルの内容は2以上、40以下の文字で入力してください";
      if (res.body)
        errors.body = "本文の内容は2以上、2000以下の文字で入力してください";

      let msg = "エラー:\n";
      if (Object.keys(errors)) {
        for (const x of Object.values(errors)) {
          msg += x + "\n";
        }
      } else {
        msg += "未知のエラーが発生しました。\n";
      }
      alert(msg);
    } finally {
      setIsWriteOnProgress(false);
    }
  }, []);

  return (
    <Wrapper>
      <Category>
        <span className="head">
          <CreateIcon
            fontSize="small"
            className="icon"
            style={{ verticalAlign: "middle" }}></CreateIcon>
          カテゴリ
        </span>
        {categories.map((item, idx) => (
          <Button
            key={idx}
            className={`item`}
            bg={`${
              item === currentCategory ? colors.lightblue[2] : colors.gray[3]
            }`}
            shadow="none"
            onClick={() => handleOnClickCategory(item)}>
            {item}
          </Button>
        ))}
      </Category>
      <PostTitle
        ref={refs.postTitle}
        type="text"
        placeholder="タイトルを入力してください"></PostTitle>
      <PostBody
        ref={refs.postBody}
        className="write-body"
        placeholder="内容を入力してください"></PostBody>
      <ActionButtons>
        <Button
          className="common return"
          bg={colors.bluegray[5]}
          onClick={() => handleOnClickReturn()}>
          戻る
        </Button>
        <Button
          className="common write"
          bg={colors.lightgreen[5]}
          disabled={isWriteOnProgress}
          onClick={() => handleOnClickWrite()}>
          {isWriteOnProgress && <LoadingIndicator></LoadingIndicator>}登録
        </Button>
      </ActionButtons>
    </Wrapper>
  );
}

const ActionButtons = styled.div`
  width: 100%;
  margin-top: 0.8rem;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  .common {
    padding: 0.4em 1.8em;
    margin-right: 1.1em;

    border-radius: 5px;

    font-size: 1.1rem;
    color: white;
  }

  .return {
  }

  .write {
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Category = styled.div`
  border: 1px solid ${colors.border.main};

  font-size: 1.05rem;

  .head {
    display: inline-block;
    margin: 0.2em;
    padding: 4px 0.5em;

    background-color: ${colors.lightgreen[5]};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);

    color: white;
  }
  .item {
    display: inline-block;
    margin: 0.2em;
    padding: 4px 0.5em;

    border-radius: 10px;

    font-weight: 400;
  }
`;

const PostTitle = styled.input`
  width: 100%;

  margin-top: 0.8em;
  border: 1px solid ${colors.border.main};

  font-size: 1.05rem;
`;

const PostBody = styled.textarea`
  width: 100%;
  height: 24rem;

  margin-top: 0.8em;
  border: 1px solid ${colors.border.main};

  white-space: pre-wrap;
  word-break: keep-all;
`;
