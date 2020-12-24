import React from "react";
import styled from "styled-components";

// Communication stuff
// import axios from 'axios';
// import NextLink from "next/link";
// import NextRouter from "next/router";
// import { useRouter } from "next/router";

// Material-ui stuff
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";

// Redux stuff
// import { shallowEqual, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { RootState } from "store";

// Components
// import Button from 'atoms/Button';
import { colors } from "styles/theme";

const icons = [
  `javascript.png`,
  `cpp.png`,
  `css.png`,
  `rest_client.png`,
  `material_ui.png`,
  `thunk.jpg`,
  `redux.png`,
  `nodejs.png`,
  `firebase.png`,
  `csharp.png`,
  `axios.png`,
  `atomic_design.png`,
  `styled_components.png`,
  `express.png`,
];

export default function fun(props) {
  React.useEffect(() => {});

  return (
    <>
      <h1>Home!</h1>
      <SkillsArea>
        Front End Development A JavaScript developer, familiar with several
        frameworks: <br />
        Back End Development Node, NoSQL, and ExpressJS server setup for API
        or/routing. <br />
        Development Tools Git, AWS, Webpack and more <br />
        {icons.map((icon, idx) => (
          <img
            className="skill-icon"
            key={idx}
            src={`/images/home/icons/${icon}`}
            alt={icon}></img>
        ))}
      </SkillsArea>
    </>
  );
}

const SkillsArea = styled.div`
  background-color: ${colors.gray[3]};

  & .skill-icon {
    border-radius: 70%;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }
`;
