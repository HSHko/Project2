import React from "react";
import styled from "styled-components";
import { isContext } from "vm";

// Communication stuff
import axios from "axios";
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
import { colors } from "styles/theme";
import Button from "atoms/Button";

// interface Props {}

export default function fun(props) {
  const { self_like } = props.preProps.postQry;

  const [isFetching, setIsFetching] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);

  React.useEffect(() => {
    setIsLiked(props.preProps.postQry.self_like > 0 ? true : false);
    setIsDisliked(props.preProps.postQry.self_like < 0 ? true : false);
  }, []);

  const handleOnClickLike = React.useCallback(() => {
    if (isFetching) return;
    setIsFetching(true);
    (async function () {
      try {
        await axios.post;
      } catch (err) {}
    })();
    setIsFetching(false);
  }, [isFetching]);

  const handleOnClickDislike = React.useCallback(() => {
    if (isFetching) return;
    setIsFetching(true);
    setIsFetching(false);
  }, [isFetching]);

  return (
    <Wrapper>
      <ButtonsArea>
        <div>
          <Button className="like">Like!</Button>
        </div>
        <div>
          <Button className="dislike">Dis!</Button>
        </div>
      </ButtonsArea>
      <Paragraphs></Paragraphs>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 1px solid ${colors.bluegray[5]};
`;

const ButtonsArea = styled.div`
  display: flex;
  align-items: center;

  & div {
  }
`;

const Paragraphs = styled.div``;
