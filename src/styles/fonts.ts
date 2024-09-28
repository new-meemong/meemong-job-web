import { css } from "styled-components";
import { colors } from "./colors";
import pxToVw from "@/lib/dpi-converter";

export const fonts = {
  // purplePrimary
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
  purplePrimaryNormal12: css`
    font-size: ${pxToVw(12)};
    font-weight: 400;
    color: ${colors.purplePrimary};
  `,

  // purpleSecondary
  purpleSecondaryBold20: css`
    font-size: ${pxToVw(20)};
    font-weight: 700;
    color: ${colors.purpleSecondary};
  `,

  // black
  blackBold18: css`
    font-size: ${pxToVw(18)};
    font-weight: 700;
    color: ${colors.black};
  `,
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
  blackBold12: css`
    font-size: ${pxToVw(12)};
    font-weight: 700;
    color: ${colors.black};
  `,
  blackSemi14: css`
    font-size: ${pxToVw(14)};
    font-weight: 500;
    color: ${colors.black};
  `,
  blackNormal14: css`
    font-size: ${pxToVw(14)};
    font-weight: 400;
    color: ${colors.black};
  `,

  blackSemi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.black};
  `,
  blackNormal12: css`
    font-size: ${pxToVw(12)};
    font-weight: 400;
    color: ${colors.black};
  `,

  // grey
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
  greyNormal12: css`
    font-size: ${pxToVw(12)};
    font-weight: 400;
    color: ${colors.grey};
  `,
  greyNormal10: css`
    font-size: ${pxToVw(10)};
    font-weight: 400;
    color: ${colors.grey};
  `,

  // greyText
  greyTextBold20: css`
    font-size: ${pxToVw(20)};
    font-weight: 700;
    color: ${colors.greyText};
  `,
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
  greyTextNormal16: css`
    font-size: ${pxToVw(16)};
    font-weight: 400;
    color: ${colors.greyText};
  `,
  greyTextNormal12: css`
    font-size: ${pxToVw(12)};
    font-weight: 400;
    color: ${colors.greyText};
  `,
  // greyText2
  greyText2Normal10: css`
    font-size: ${pxToVw(10)};
    font-weight: 400;
    color: ${colors.greyText2};
  `,

  // greyText4
  greyText4Bold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.greyText4};
  `,
  greyText4Bold12: css`
    font-size: ${pxToVw(12)};
    font-weight: 700;
    color: ${colors.greyText4};
  `,
  greyText4Semi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.greyText4};
  `,
  greyText4Semi10: css`
    font-size: ${pxToVw(10)};
    font-weight: 500;
    color: ${colors.greyText4};
  `,

  // greyTextEditLabel
  greyTextEditLabelBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.greyTextEditLabel};
  `,
  greyTextEditLabelBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.greyTextEditLabel};
  `,
  greyTextEditLabelSemi12: css`
    font-size: ${pxToVw(12)};
    font-weight: 500;
    color: ${colors.greyTextEditLabel};
  `,

  // greyTitle
  greyTitleBold18: css`
    font-size: ${pxToVw(18)};
    font-weight: 700;
    color: ${colors.greyTitle};
  `,

  greyPlaceholderBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.greyBacground4};
  `,

  // white
  whiteBold16: css`
    font-size: ${pxToVw(16)};
    font-weight: 700;
    color: ${colors.white};
  `,
  whiteBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.white};
  `,
  whiteNormal16: css`
    font-size: ${pxToVw(16)};
    font-weight: 400;
    color: ${colors.white};
  `,

  // red
  redBold14: css`
    font-size: ${pxToVw(14)};
    font-weight: 700;
    color: ${colors.red};
  `,
  redNormal12: css`
    font-size: ${pxToVw(12)};
    font-weight: 400;
    color: ${colors.red};
  `
};
