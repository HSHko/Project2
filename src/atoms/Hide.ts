import styled from "styled-components";

const deviceSize = {
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
  minm?: boolean;
  maxm?: boolean;
  mint?: boolean;
  maxt?: boolean;
  minl?: boolean;
  maxl?: boolean;
}

export default styled.div.attrs(() => ({}))<Props>`
  ${p => {
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
`;
