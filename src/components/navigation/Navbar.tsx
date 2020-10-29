import React from "react";
import Link from "next/link";
import styled from "styled-components";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import Hide from "atoms/Hide";
import Button from "atoms/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { color } from "styles/theme";
import menuItems from "./menuItems";

export default function fun() {
  console.log("init");
  // const dispatch = useDispatch();

  return (
    <Wrapper>
      <Divider>
        <div>
          <CorpLogo>CorpLogo</CorpLogo>
        </div>

        <div>
          <Hide tmin>
            <Button shadow="transparent" bg={color.nav.top.main}>
              <MenuIcon></MenuIcon>
            </Button>
          </Hide>
          <Hide mmax>
            <LinksWrapper>
              {menuItems.map(e => {
                if (e.link !== undefined) {
                  return (
                    <Link href={e.link}>
                      <Button key={e.name} as="a">
                        {e.name}
                      </Button>
                    </Link>
                  );
                } else {
                  return <Button key={e.name}>{e.name}</Button>;
                }
              })}
            </LinksWrapper>
          </Hide>
        </div>
      </Divider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.color.lime[2]};
`;

const Divider = styled.div`
  width: 90%;
  height: ${p => p.theme.vars.navbar.height};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${p => p.theme.color.nav.top.main};
`;

const CorpLogo = styled.div``;

const LinksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
