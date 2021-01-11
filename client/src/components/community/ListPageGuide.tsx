import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
// import NextRouter from "next/router";
import { useRouter } from "next/router";

// Material-ui stuff
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";

export default function fun(props) {
  const nextRouter = useRouter();

  const [prevPageAdr, setPrevPageAdr] = React.useState(1);
  const [nextPageAdr, setNextPageAdr] = React.useState(1);
  const [adjacentPages, setAdjacentPages] = React.useState([]);

  React.useEffect(() => {
    const currentPage = parseInt(nextRouter.query.page as string, 10);

    const maxPageAdr = Math.max(
      1,
      Math.floor((props.ssp.pageData.latestPostIdx - 1) / 10) + 1,
    );

    const prevPageAdr = Math.max(
      1,
      (Math.floor((currentPage + 10 - 1) / 10) - 2) * 10 + 1,
    );
    setPrevPageAdr(prevPageAdr);

    const nextPageAdr = Math.min(
      maxPageAdr,
      Math.floor((currentPage + 10 - 1) / 10) * 10 + 1,
    );
    setNextPageAdr(nextPageAdr);

    const currentPageAdrMin =
      (Math.floor((currentPage + 10 - 1) / 10) - 1) * 10 + 1;
    const currentPageAdrMax = Math.min(nextPageAdr, currentPageAdrMin + 10 - 1);

    let adjPages = [];
    for (var i = currentPageAdrMin; i <= currentPageAdrMax; i++) {
      adjPages.push(i);
    }
    setAdjacentPages(adjPages);

    // console.log({
    //   max: maxPageAdr,
    //   prev: prevPageAdr,
    //   next: nextPageAdr,
    //   cur_min: currentPageAdrMin,
    //   cur_max: currentPageAdrMax,
    //   adjs: adjPages,
    //   page: nextRouter.query.page,
    // });
  }, [nextRouter.query.page]);

  return (
    <Wrapper>
      <NextLink href={`/community/list?page=${prevPageAdr}`}>
        <a>
          <Button className="pageGuide" bg="transparent">
            <FastRewindIcon fontSize="small"></FastRewindIcon>
          </Button>
        </a>
      </NextLink>
      <hr className="vr"></hr>
      {adjacentPages.map((page) => {
        return (
          <React.Fragment key={page}>
            <NextLink href={`/community/list?page=${page}`}>
              <a>
                <Button
                  className={`pageGuide`}
                  bg={
                    parseInt(nextRouter.query.page as string, 10) === page
                      ? colors.lightblue[2]
                      : "transparent"
                  }>
                  {page}
                </Button>
              </a>
            </NextLink>
            <hr className="vr"></hr>
          </React.Fragment>
        );
      })}
      <NextLink href={`/community/list?page=${nextPageAdr}`}>
        <a>
          <Button className="pageGuide" bg="transparent">
            <FastForwardIcon fontSize="small"></FastForwardIcon>
          </Button>
        </a>
      </NextLink>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .pageGuide {
    padding: 0.4rem 0.6rem;

    color: black;
    box-shadow: none;
  }
`;
