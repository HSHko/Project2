import React from "react";
// import Link from "next/link";
// import styled from "styled-components";
// import { css } from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import { dialogs } from "store";
import BackDrop from "atoms/BackDrop";

export default function fun(props) {
  console.log("init");
  React.useEffect(() => {
    if (props.BackDrop) {
      dispatch(dialogs.hi(undefined));
    }
  }, []);

  const dispatch = useDispatch();
  const storeDialog = useSelector((x: RootState) => x.dialog);

  return (
    <React.Fragment>
      {storeDialog.isHi ? <BackDrop onClick={() => dispatch(dialogs.lo())}></BackDrop> : null}
    </React.Fragment>
  );
}

// const Wrapper = styled.div``;
