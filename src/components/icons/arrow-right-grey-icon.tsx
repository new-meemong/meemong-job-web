import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(14)};
  height: ${pxToVw(14)};
  position: relative;
`;

const ArrowRightGreyIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/arrow_right_grey.svg"
      alt="Arrow Right"
      fill // 이미지가 부모의 크기에 맞춰지도록 설정
    />
  </IconWrapper>
);

export default ArrowRightGreyIcon;
