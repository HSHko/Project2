import styled from "styled-components";

export const deviceSize = {
  mobile: {
    min: "1px",
    max: "768px",
  },
  tablet: {
    min: "769px",
    max: "1024px",
  },
  laptop: {
    min: "1025px",
    max: "1440px",
  },
};

interface Props {
  whenShorterThan?: "mobile" | "tablet" | "laptop";
  whenLongerThan?: "mobile" | "tablet" | "laptop";
}

export default styled.div.attrs(() => ({}))<Props>`
  ${(p) => {
    if (p.whenShorterThan) {
      switch (p.whenShorterThan) {
        case "mobile":
          return `@media(max-width: ${deviceSize.mobile.min}) {display:none;}`;
        case "tablet":
          return `@media(max-width: ${deviceSize.tablet.min}) {display:none;}`;
        case "laptop":
          return `@media(max-width: ${deviceSize.laptop.min}) {display:none;}`;
        default:
          break;
      }
    } else if (p.whenLongerThan) {
      switch (p.whenLongerThan) {
        case "mobile":
          return `@media(min-width: ${deviceSize.mobile.max}) {display:none;}`;
        case "tablet":
          return `@media(min-width: ${deviceSize.tablet.max}) {display:none;}`;
        case "laptop":
          return `@media(min-width: ${deviceSize.laptop.max}) {display:none;}`;
        default:
          break;
      }
    }
  }}
`;

/*
const media = {
  mobile: {
    min: `@media(min-width: ${deviceSize.mobile.min})`,
    max: `@media(max-width: ${deviceSize.mobile.max})`,
  },
  tablet: {
    min: `@media(min-width: ${deviceSize.tablet.min})`,
    max: `@media(max-width: ${deviceSize.tablet.max})`,
  },
  laptop: {
    min: `@media(min-width: ${deviceSize.laptop.min})`,
    max: `@media(max-width: ${deviceSize.laptop.max})`,
  },
};

interface Props {
  shorterThan?: "mobile" | "tablet" | "laptop";
  longerThan?: "mobile" | "tablet" | "laptop";
  minm?: boolean;
  maxm?: boolean;
  mint?: boolean;
  maxt?: boolean;
  minl?: boolean;
  maxl?: boolean;

  ${(p) => {
    if (p.minm) {
      return `${media.mobile.min} {display:none;}`;
    } else if (p.maxm) {
      return `${media.mobile.max} {display:none;}`;
    } else if (p.mint) {
      return `${media.tablet.min} {display:none;}`;
    } else if (p.maxt) {
      return `${media.tablet.max} {display:none;}`;
    } else if (p.minl) {
      return `${media.laptop.min} {display:none;}`;
    } else if (p.maxl) {
      return `${media.laptop.max} {display:none;}`;
    }
  }}
}
*/
