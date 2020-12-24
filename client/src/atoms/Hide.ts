import styled from "styled-components";
import { css } from "styled-components";

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

export const media = {
  lessThanMobile: `@media(max-width: ${deviceSize.mobile.min})`,
  lessThanTablet: `@media(max-width: ${deviceSize.tablet.min})`,
  lessThanLaptop: `@media(max-width: ${deviceSize.laptop.min})`,
  greaterThanMobile: `@media(min-width: ${deviceSize.mobile.max})`,
  greaterThanTablet: `@media(min-width: ${deviceSize.mobile.max})`,
  greaterThanLaptop: `@media(min-width: ${deviceSize.mobile.max})`,
};

interface Props {
  when:
    | "lessThanMobile"
    | "lessThanTablet"
    | "lessThanLaptop"
    | "greaterThanMobile"
    | "greaterThanTablet"
    | "greaterThanLaptop";
}

export default styled.div.attrs(() => ({}))<Props>`
  ${(p) => {
    return css`
      ${media[p.when]} {
        display: none;
      }
    `;
  }}
`;
