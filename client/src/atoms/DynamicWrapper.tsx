import styled from "styled-components";

// 박스 css 참고:
// webdir.tistory.com/413

interface Props {
  align?: "left" | "center" | "right";
  border?: string;
  margin?: string;
  padding?: string;
  children?: any;
}

export default function fun(props: Props) {
  return (
    <OuterWrapper align={props.align}>
      <InnerWrapper
        margin={props.margin}
        border={props.border}
        padding={props.padding}>
        {props.children}
      </InnerWrapper>
    </OuterWrapper>
  );
}

const OuterWrapper = styled.div.attrs(() => ({}))<any>`
  position: relative;
  text-align: ${(p) => (p.align ? p.align : `center`)};
`;

const InnerWrapper = styled.div.attrs(() => ({}))<any>`
  display: inline-block;
  position: relative;
  border: ${(p) => (p.border ? p.border : `3px solid black`)};
  margin: ${(p) => (p.margin ? p.margin : `0`)};
  padding: ${(p) => (p.padding ? p.padding : `0`)};
`;
