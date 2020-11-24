import styled, { css } from "styled-components";

interface Props {
  align?: "left" | "center" | "right";
  border?: string;
  margin?: string;
  padding?: string;
  children?: any;
}

export default function fun(props: Props) {
  return (
    <Wrapper align={props.align}>
      <CenterWrapper border={props.border} padding={props.padding}>
        {props.children}
      </CenterWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs(() => ({}))<any>`
  text-align: ${p => (p.align ? `${p.align}` : `center`)};
`;

const CenterWrapper = styled.div.attrs(() => ({}))<any>`
  display: inline-block;
  border: ${p => (p.border ? `${p.border}` : `3px solid black`)};
  ${p => {
    if (p.margin) return `margin: ${p.margin}`;
    else return `margin: 5rem auto;`;
  }}
  ${p => {
    if (p.padding) return `padding: ${p.padding}`;
  }}
`;
