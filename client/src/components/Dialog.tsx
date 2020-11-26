import React from "react";
// import Link from "next/link";
// import styled from "styled-components";
// import { css } from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "store";
import BackDrop from "atoms/BackDrop";

export default function fun(props) {
  React.useEffect(() => {
    console.log("render");
  }, []);

  const dispatch = useDispatch();
  const storeDialog = useSelector((x: RootState) => x.dialogReducer);

  return (
    <React.Fragment>
      {storeDialog.isHi ? (
        <BackDrop onClick={() => dispatch({ type: "dialog/LO" })}></BackDrop>
      ) : null}
    </React.Fragment>
  );
}

// const Wrapper = styled.div``;
