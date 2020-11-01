import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sideBars } from "store";
import Hide from "atoms/Hide";
import Button from "atoms/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { color } from "styles/theme";
import menuItems from "./menuItems";
import SideBar from "./SideBar";

export default function fun(props) {
  console.log("init");
  const dispatch = useDispatch();
  const storeSideBar = useSelector((x: RootState) => x.sideBar);

  const handleOnClickLink = React.useCallback(
    e => () => {
      dispatch(sideBars.lo());
      if (e.label == "login") {
      }
    },
    [dispatch],
  );

  const handleOnClickSideBar = React.useCallback(() => {
    console.log("");
  }, [storeSideBar]);

  return (
    <Wrapper>
      <Appbar>
        <div>
          <CorpLogo>CorpLogo</CorpLogo>
        </div>
        <RWrapper>
          <Hide maxm>
            <LinksWrapper>
              {menuItems.map(e => {
                if (e.link) {
                  return (
                    <Link href={e.link} key={e.name}>
                      <Button as="a">{e.name}</Button>
                    </Link>
                  );
                } else {
                  return (
                    <Button key={e.name} onClick={handleOnClickLink(e)}>
                      {e.name}
                    </Button>
                  );
                }
              })}
            </LinksWrapper>
          </Hide>
          <Button shadow="transparent" bg={color.nav.top.main} onClick={console.log("")}>
            <MenuIcon></MenuIcon>
          </Button>
        </RWrapper>
      </Appbar>
      <SideBar></SideBar>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.color.lime[2]};
`;

const Appbar = styled.div`
  width: 90%;
  max-width: ${p => p.theme.vars.navbar.maxWidth};
  height: ${p => p.theme.vars.navbar.height};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${p => p.theme.color.nav.top.main};
`;

const RWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CorpLogo = styled.div``;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
