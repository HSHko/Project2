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
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import { colors } from "styles/theme";

// interface Props {}

export default React.memo(function fun(props) {
  const nextRouter = useRouter();
  // const dispatch = useDispatch();

  const [commentsData, setCommentsData] = React.useState(null);

  const refs = {
    newCommentBody: React.useRef<any>(""),
  };

  React.useEffect(() => {
    (async function () {
      try {
        const commentsQry = await axios.get(
          `/api/comments/getcomments/${nextRouter.query.idx}`,
        );
        console.log(commentsQry);
        setCommentsData(commentsQry.data);
      } catch (err) {
        console.error(err);
      }
    })();
  });

  return (
    <Wrapper>
      <ScreamdComments></ScreamdComments>
      <NewComment>
        <DonorBox>DonorNameisHere</DonorBox>
        <InputBox>
          <textarea
            className="comment-body"
            placeholder="コメントを入力してください"></textarea>
        </InputBox>
      </NewComment>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
`;

const ScreamdComments = styled.div``;

const NewComment = styled.div`
  border-top: 3rem solid ${colors.deeppurple[3]};
  border-bottom: 3rem solid ${colors.deeppurple[3]};
  margin: 0 0.5rem;
  padding: 0.25rem 1rem;

  display: flex;
  align-items: flex-start;
`;

const DonorBox = styled.div`
  margin: 0 0.25rem;
`;

const InputBox = styled.div``;
