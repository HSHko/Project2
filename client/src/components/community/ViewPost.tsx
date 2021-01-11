import React from "react";
import styled from "styled-components";

// Communication stuff
import axios from "axios";
// import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
import ForumIcon from "@material-ui/icons/Forum";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbsUpDownIcon from "@material-ui/icons/ThumbsUpDown";
import SmsIcon from "@material-ui/icons/Sms";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";

export default function fun(props) {
  const nextRouter = useRouter();
  const { postData } = props.ssp;
  const [likeQuantity, setLikeQuantity] = React.useState(postData.like_cnt);
  const [dislikeQuantity, setDislikeQuantity] = React.useState(
    postData.dislike_cnt,
  );

  const handleOnClickLike = React.useCallback(async (cond) => {
    if (!["like", "dislike"].includes(cond)) return;

    try {
      const likeQry = await axios.post(
        `/api/likes/addliketopost/${nextRouter.query.idx}/${cond}`,
      );
      const postQry = await axios.get(
        `/api/posts/getpost/${nextRouter.query.idx}`,
      );

      setLikeQuantity(postQry.data.postData.like_cnt);
      setDislikeQuantity(postQry.data.postData.dislike_cnt);
    } catch (err) {
      console.error(err);
      const res = err.response.data;

      let msg = "";
      if (res.fb_auth) msg = "ログインが必要です";
      if (res.rebundancy) return;
      alert(msg);
    }
  }, []);

  return (
    <Wrapper>
      <Head>
        <div className="state_1">
          <PersonAddIcon className="icon" fontSize="large"></PersonAddIcon>
          <div>
            <div className="donor">{postData.donor}</div>
            <div className="created_at">{postData.created_at}</div>
          </div>
        </div>
        <div className="state_2">
          <span
            className={`category ${
              postData.category === "一般" ? "common" : ""
            }`}>
            <ForumIcon className="icon" fontSize="small"></ForumIcon>
            {postData.category}
          </span>
          <span className="idx">#{postData.idx}</span>
        </div>
        <div className="state_3">
          <div className="title">
            <h2>{postData.title}</h2>
          </div>
          <div className="counts">
            <span>
              <VisibilityIcon
                className="icon"
                fontSize="small"></VisibilityIcon>
              {postData.view_cnt}
            </span>
            <hr className="vr" />
            <span>
              <ThumbsUpDownIcon
                className="icon"
                fontSize="small"></ThumbsUpDownIcon>
              {postData.like_quantity}
            </span>
            <hr className="vr" />
            <span>
              <SmsIcon className="icon" fontSize="small"></SmsIcon>
              {postData.comment_cnt}
            </span>
          </div>
        </div>
      </Head>
      <hr style={{ marginTop: "0.25rem" }} />
      <Body>{postData.body}</Body>
      <LikeZone>
        <div className="like-cnt cnt">{likeQuantity}</div>
        <Button
          className={`like button ${likeQuantity > 0 ? "hi" : null}`}
          bg={colors.lightblue[8]}
          onClick={() => handleOnClickLike("like")}>
          <StarIcon fontSize="large" />
        </Button>
        <Button
          className={`dislike button ${dislikeQuantity > 0 ? "hi" : null}`}
          bg={colors.gray[6]}
          onClick={() => handleOnClickLike("dislike")}>
          <ThumbDownIcon fontSize="large" />
        </Button>
        <div className="dislike-cnt cnt">{dislikeQuantity}</div>
      </LikeZone>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const LikeZone = styled.div`
  position: relative;
  display: inline-flex;
  left: 50%;
  transform: translate(-50%, 0);

  margin-top: 2rem;
  border: 1px solid ${colors.border.main};
  padding: 0.6rem 0.25rem;

  align-items: center;

  & > .button {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;

    color: white;

    &.like {
      margin-right: 0.6rem;
    }

    &.hi {
      color: ${colors.amber[5]};
    }
  }

  & > .cnt {
    margin: 0 1.2em;

    font-size: 1.4rem;
    font-weight: 700;

    &.like-cnt {
      color: red;
    }
    &.dislike-cnt {
      color: ${colors.gray[6]};
    }
  }
`;

const Body = styled.div`
  white-space: nowrap;

  margin-top: 0.8rem;
  font-size: 1rem;
`;

const Head = styled.div`
  & > .state_1 {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 0.25em;
    }

    .donor {
      color: ${colors.user.main};
    }

    .created_at {
      font-size: 0.9em;
      color: ${colors.gray[6]};
    }
  }

  & > .state_2 {
    font-size: 0.8rem;
    .category {
      display: inline-block;
      margin-top: 0.25rem;
      padding: 2px 0.25rem;
      padding-right: 0.5rem;

      border-radius: 6px;
      background-color: ${colors.deeporange[5]};
      &.common {
        background-color: ${colors.cyan[4]};
      }

      color: white;

      .icon {
        vertical-align: middle;
      }
    }

    .idx {
      margin-left: 0.6rem;
    }
  }

  & > .state_3 {
    display: flex;
    justify-content: space-between;

    .title {
    }

    .counts {
      margin-right: 0.8rem;

      .icon {
        vertical-align: middle;
        margin-right: 0.2rem;
      }

      hr {
        margin: 0 0.4rem;
      }
    }
  }
`;
