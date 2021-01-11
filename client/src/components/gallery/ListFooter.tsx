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
    const currentPage = parseInt(nextRouter.query.page as string, 10);
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

  return (
    <Wrapper>
      <WriteMover>
        <div className="left"></div>
        <div className="right">
          <NextLink href={`/gallery/write`}>
            <a>
              <Button className="write-button" shadow="none">
                Write
              </Button>
            </a>
          </NextLink>
        </div>
      </WriteMover>
      <PageMover>
        <NextLink href={`list?page=${prevExplorer}`}>
          <a>
            <Button className="page-link" bg="transparent" shadow="none">
              前
            </Button>
          </a>
        </NextLink>
        {pageExplorers.map((el, idx) => (
          <React.Fragment key={idx}>
            {idx !== 0 ? <hr className="vr"></hr> : null}
            <NextLink href={`list?page=${el}`}>
              <a>
                <Button
                  className={`page-link ${el}`}
                  bg="transparent"
                  shadow="none"
                  color={nextRouter.query.page === el ? `red` : `black`}>
                  {el}
                </Button>
              </a>
            </NextLink>
          </React.Fragment>
        ))}
        <NextLink href={`list?page=${nextExplorer}`}>
          <a>
            <Button className="page-link" bg="transparent" shadow="none">
              次
            </Button>
          </a>
        </NextLink>
      </PageMover>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const WriteMover = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.6rem;

  & .right {
    margin-right: 1.2rem;
  }

  & .write-button {
    font-size: 1.1rem;
    padding: 0.5rem 1.2rem;
    border-radius: 10%;
    border: 1px solid black;
  }
`;

const PageMover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  & .page-link {
    color: black;
  }
`;
