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
  mmin?: boolean;
  mmax?: boolean;
  tmin?: boolean;
  tmax?: boolean;
  lmin?: boolean;
  lmax?: boolean;
}

export default styled.div.attrs(() => ({}))<Props>`
  ${p => {
    if (p.mmin) {
      return `${media.mobile.min} {display:none;}`;
    } else if (p.mmax) {
      return `${media.mobile.max} {display:none;}`;
    } else if (p.tmin) {
      return `${media.tablet.min} {display:none;}`;
    } else if (p.tmax) {
      return `${media.tablet.max} {display:none;}`;
    } else if (p.lmin) {
      return `${media.laptop.min} {display:none;}`;
    } else if (p.lmax) {
      return `${media.laptop.max} {display:none;}`;
    }
  }}
`;
