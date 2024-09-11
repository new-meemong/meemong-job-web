import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;
const CloseCircleGreyIcon = () => (
  <IconWrapper>
    <Image src="/icons/close_circle_grey.svg" alt="Close Circle" fill />
  </IconWrapper>
);

export default CloseCircleGreyIcon;
