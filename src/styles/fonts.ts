import { css } from "styled-components";
import { colors } from "./colors";
import pxToVw from "@/lib/dpi-converter";

export const fonts = {
  //purplePrimary
  purplePrimaryBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.purplePrimary};
  `,
  purplePrimaryBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.purplePrimary};
  `,
  purplePrimarySemi14: css`
    font-size: ${pxToVw(14)};
    font-weight: 500;
    color: ${colors.purplePrimary};
  `,
  purplePrimaryBold12: css`
    font-size: ${pxToVw(12)};
    font-weight: 700;
    color: ${colors.purplePrimary};
  `,
  purplePrimarySemi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.purplePrimary};
  `,

  //purpleSecondary
  purpleSecondaryBold20: css`
    font-size: ${pxToVw(20)};
    font-weight: 700;
    color: ${colors.purpleSecondary};
  `,

  //black
  blackBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.black};
  `,
  blackBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.black};
  `,
  blackSemi14: css`
    font-size: ${pxToVw(14)};
    font-weight: 500;
    color: ${colors.black};
  `,
  blackSemi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.black};
  `,

  //grey
  greySemi16: css`
    font-size: ${pxToVw(16)};
    font-weight: 500;
    color: ${colors.grey};
  `,
  greySemi14: css`
    font-size: ${pxToVw(14)};
    font-weight: 500;
    color: ${colors.grey};
  `,
  greySemi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.grey};
  `,
  greyNormal14: css`
    font-size: ${pxToVw(14)};
    font-weight: 400;
    color: ${colors.grey};
  `,
  greyNormal10: css`
    font-size: ${pxToVw(10)};
    font-weight: 400;
    color: ${colors.grey};
  `,

  //greyText
  greyTextBold18: css`
    font-size: ${pxToVw(18)};
    font-weight: 700;
    color: ${colors.greyText};
  `,
  greyTextBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.greyText};
  `,
  greyTextBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.greyText};
  `,
  greyTextSemi16: css`
    font-size: ${pxToVw(16)};
    font-weight: 500;
    color: ${colors.greyText};
  `,

  //greyText2
  greyText2Normal10: css`
    font-size: ${pxToVw(10)};
    font-weight: 400;
    color: ${colors.greyText2};
  `,

  //greyText4
  greyText4Bold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.greyText4};
  `,

  //greyTextEditLabel
  greyTextEditLabelBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.greyTextEditLabel};
  `,

  //white
  whiteBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.white};
  `,
  whiteBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.white};
  `
};
