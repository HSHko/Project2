import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
import CreateIcon from "@material-ui/icons/Create";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";
import ListTable from "./ListTable";
import ListPageGuide from "./ListPageGuide";

export default function fun(props) {
  React.useEffect(() => {
    console.log({ props: props.ssp });
  }, []);
  return (
    <Wrapper>
      <CommunityTitle>COMMUNITY</CommunityTitle>
      <ListTable ssp={props.ssp}></ListTable>
      <ButtonsUnderTable>
        <NextLink href={`/community/write`}>
          <a>
            <Button
              className="write"
              bg={`${colors.lightgreen[5]}`}
              style={{ color: "white" }}>
              <CreateIcon></CreateIcon>書き込み
            </Button>
          </a>
        </NextLink>
      </ButtonsUnderTable>
      <ListPageGuide ssp={props.ssp}></ListPageGuide>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
`;

const CommunityTitle = styled.div`
  font-size: 2.6rem;
  font-weight: 700;
  margin-top: 1rem;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
`;

const ButtonsUnderTable = styled.div`
  margin-top: 0.8rem;
  margin-bottom: 1.6rem;
  margin-right: 1.2rem;

  display: flex;
  justify-content: flex-end;
  flex-direction: row;

  .write {
    width: 16rem;
    border-radius: 10px;
  }
`;
