import React from "react";
import styled from "styled-components";
import { isContext } from "vm";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
import GradeIcon from "@material-ui/icons/Grade";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

// Redux stuff
import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
import { colors } from "styles/theme";
import Button from "atoms/Button";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();
  const { self_like } = props.preProps.postData;

  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [likeCnt, setLikeCnt] = React.useState(0);
  const [dislikeCnt, setDislikeCnt] = React.useState(0);

  const refs = {
    isScreening: React.useRef<any>(true),
    isFetching: React.useRef<any>(false),
  };

  React.useEffect(() => {
    setLikeCnt(props.preProps.postData.like_cnt);
    setDislikeCnt(props.preProps.postData.dislike_cnt);
    (async function () {
      try {
        const likeQry = await axios.post(
          `/iikes/getselflikequantityfrompost/${nextRouter.query.idx}`,
        );
        setIsLiked(likeQry.data > 0 ? true : false);
        setIsDisliked(likeQry.data > 0 ? true : false);
      } catch (error) {
        const res = error.response.data;
        if (res.fb_auth) console.error({ screeningError: `not logined` });
      } finally {
        refs.isScreening.current = false;
      }
    })();
  }, []);

  const handleOnClickLike = React.useCallback(() => {
    if (refs.isScreening.current) return;
    if (refs.isFetching.current) return;

    refs.isFetching.current = true;
    (async function () {
      try {
        const likeQry = await axios.post(
          `/api/likes/addliketopost/${nextRouter.query.idx}?like=1`,
        );
        setLikeCnt(likeQry.data.like_cnt);
        setDislikeCnt(likeQry.data.dislike_cnt);
        setIsLiked(likeQry.data.selfLikeCnt > 0 ? true : false);
        setIsDisliked(likeQry.data.selfLikeCnt < 0 ? true : false);
      } catch (err) {
        const res = err.response.data;
        if (res.fb_auth) {
          alert("ログインが必要です。");
        }
      } finally {
        refs.isFetching.current = false;
      }
    })();
  }, [refs.isFetching.current]);

  const handleOnClickDislike = React.useCallback(() => {
    if (refs.isScreening.current) return;
    if (refs.isFetching.current) return;
    refs.isFetching.current = true;
    (async function () {
      try {
        const likeQry = await axios.post(
          `/api/likes/addliketopost/${nextRouter.query.idx}?like=-1`,
        );
        setLikeCnt(likeQry.data.like_cnt);
        setDislikeCnt(likeQry.data.dislike_cnt);
        setIsLiked(likeQry.data.selfLikeCnt > 0 ? true : false);
        setIsDisliked(likeQry.data.selfLikeCnt < 0 ? true : false);
      } catch (err) {
        const res = err.response.data;
        if (res.fb_auth) {
          alert("ログインが必要です。");
        }
      } finally {
        refs.isFetching.current = false;
      }
    })();
  }, []);

  return (
    <Wrapper>
      <PostLikeWrapper>
        <div>
          <div className="like-cnt">{likeCnt}</div>
          <div>
            <Button
              className="like"
              color={isLiked ? "red" : "white"}
              onClick={() => handleOnClickLike()}>
              <GradeIcon></GradeIcon>
            </Button>
          </div>
          <div>
            <Button
              className="dislike"
              color={isDisliked ? "red" : "white"}
              bg="gray"
              onClick={() => handleOnClickDislike()}>
              <TrendingDownIcon></TrendingDownIcon>
            </Button>
          </div>
          <div className="dislike-cnt">{dislikeCnt}</div>
        </div>
      </PostLikeWrapper>
      <Paragraphs></Paragraphs>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const PostLikeWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  & > * {
    display: flex;
    align-items: center;
  }

  & .like,
  .dislike {
    margin: 0 0.5rem;
  }

  & .like-cnt,
  .dislike-cnt {
    color: red;
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0 1.5rem;
  }

  & .dislike-cnt {
    color: gray;
  }
`;

const Paragraphs = styled.div``;
