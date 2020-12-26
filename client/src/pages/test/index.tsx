import React from "react";
import styled from "styled-components";
import { isContext } from "vm";

// Communication stuff
// import axios from 'axios';
import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuff
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
import Button from "atoms/Button";
import { colors } from "styles/theme";
import Overlay from "atoms/Overlay";

// interface Props {}

const TEXT_NOTHING = ` ｷ・fﾜ0ﾌnO n e   o f   y o u r   d i s k s   n e e d s   t o   b e   c h e c k e d   f o r   c o n s i s t e n c y .   Y o u 
 
 u胃0YfYfm a y   c a n c e l   t h e   d i s k   c h e c k ,   b u t   i t   i s   s t r o n g l y   r e c o m m e n d e d 
 
 ﾀ0鉄ｼ0BVt h a t   y o u   c o n t i n u e . 
 
 PzSUﾁ0ﾞ0W i n d o w s   w i l l   n o w   c h e c k   t h e   d i s k .                                                   
 
 BVｿ0M・0V o l u m e   S e r i a l   N u m b e r   i s   1 0 D D - C A 6 1 
 
 
 
 ｼ0ｷ・ﾜ0W i n d o w s   h a s   s c a n n e d   t h e   f i l e   s y s t e m   a n d   f o u n d   n o   p r o b l e m s . 
 
 tztzｼ0ﾞ0N o   f u r t h e r   a c t i o n   i s   r e q u i r e d . 
 
 Yfｾ0>oｾ0          3 1 3 1 1 8 2 4   K B   t o t a l   d i s k   s p a c e . 
 
 ﾌnｽ0u緯0                  6 9 9 2   K B   i n   1 9 9   h i d d e n   f i l e s . 
 
 ﾞ0ｼ0ﾞ0M・             5 5 1 5 3 6   K B   i n   3 3 8 6 7   f o l d e r s . `;

const testText = "asdpfoas\nsdfosdf\nasdf &#13&#10; asdf&#10;";

export default function fun(props) {
  // const nextRouter = useRouter();
  // const dispatch = useDispatch();

  const [sHeight, setSHeight] = React.useState(null);

  const refs = {
    ref: React.useRef({}),
  };

  React.useEffect(() => {
    // console.log(nextRouter.pathname);
    refs.ref.current
      ? console.log({
          offsetWidth: refs.ref.current["a"].offsetWidth,
          offsetHeight: refs.ref.current["a"].offsetHeight,
          offsetParent: refs.ref.current["a"].offsetParent,
        })
      : null;
  }, []);

  const handleOnClick = React.useCallback(() => {
    console.log("ok, clicked");
    setSHeight(`300px`);
  }, []);

  return (
    <Wrapper>
      <div className="hmh" onClick={() => handleOnClick()}>
        {testText}
      </div>
      <Button
        style={{ width: `${sHeight}` }}
        ref={(el) => (refs.ref.current["a"] = el)}
        onClick={() => handleOnClick()}>
        {/* <Overlay size={30}></Overlay> */}
        {TEXT_NOTHING}
      </Button>

      <Kotton>
        <h1>KottonKottonKottonKottonKottonKottonKottonKotton</h1>
      </Kotton>

      <ul>
        AAA
        <li>BBB</li>
        <li>BBB</li>
        <li>BBB</li>
      </ul>

      <ul>
        AAA
        <li>BBB</li>
        <li>BBB</li>
        <li>BBB</li>
        <li>BBB</li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 2rem;

  border: 3px solid violet;

  & .hmh {
    white-space: pre-line;
  }
`;

const InlineButton = styled.button`
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translate(-50%, 0);
`;

const media = {
  t1: `@media(max-width: 800px)`,
};

const Kotton = styled.div`
  ${media.t1} {
    display: none;
  }
`;
