import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
// import PersonIcon from "@material-ui/icons/Person";

// Redux stuff
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RootState } from "store";

// Components
import Button from "atoms/Button";

// interface Props {}

export default function fun(props) {
  const nextRouter = useRouter();
  const [prevExplorer, setPrevExplorer] = React.useState(1);
  const [pageExplorers, setPageExplorers] = React.useState([]);
  const [nextExplorer, setNextExplorer] = React.useState(1);

  React.useEffect(() => {
    const exhibitedPagesNum = 5;
    const currentPage = parseInt(nextRouter.query.page as string);
    const startPage =
      (Math.floor((currentPage - 1 + exhibitedPagesNum) / exhibitedPagesNum) -
        1) *
        exhibitedPagesNum +
      1;

    let explorerMaker = [];
    for (var i = startPage; i < startPage + exhibitedPagesNum; i++) {
      explorerMaker.push(i);
    }
    setPageExplorers(explorerMaker);
    setPrevExplorer(Math.max(1, explorerMaker[0] - exhibitedPagesNum));
    setNextExplorer(explorerMaker[0] + exhibitedPagesNum);
  }, [nextRouter.query.page]);

  const handleOnClickWrite = React.useCallback(() => {
    NextRouter.push("/gallery/write");
  }, []);

  const handleOnClickExplorer = React.useCallback(() => {
    NextRouter.push(`list?page=${prevExplorer}`);
    // NextRouter.reload();
  }, [prevExplorer]);

  return (
    <Wrapper>
      <PageMover>
        prev: {prevExplorer} <br />
        next: {nextExplorer} <br />
        <Button
          onClick={() => handleOnClickExplorer()}
          className="page-link"
          bg="transparent"
          shadow="none"
          as="a">
          前
        </Button>
        {pageExplorers.map((el) => (
          <NextLink key={`page_${el}`} href={`list?page=${el}`}>
            <Button
              className={`page-link ${el}`}
              bg="transparent"
              shadow="none"
              as="a">
              {el}
            </Button>
          </NextLink>
        ))}
        <NextLink href={`list?page=${nextExplorer}`}>
          <Button className="page-link" bg="transparent" shadow="none" as="a">
            次
          </Button>
        </NextLink>
      </PageMover>
      <WriteMover>
        <div className="left"></div>
        <div className="right">
          <Button
            margin="0"
            borderRadius="none"
            shadow="none"
            onClick={() => handleOnClickWrite()}>
            Write
          </Button>
        </div>
      </WriteMover>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const PageMover = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  & > .page-link {
    color: black;
    padding: auto 0.2rem;
    margin: auto 0.1rem;
  }
`;

const WriteMover = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.33rem;
`;
