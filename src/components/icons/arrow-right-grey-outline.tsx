import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  position: relative;
`;

const ArrowRightGreyOutlineIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/arrow_right_grey_outline.svg"
      alt="Arrow Right Outline"
      fill // 이미지가 부모의 크기에 맞춰지도록 설정
    />
  </IconWrapper>
);

export default ArrowRightGreyOutlineIcon;
