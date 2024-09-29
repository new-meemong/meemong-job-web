import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(14)};
  height: ${pxToVw(14)};
  position: relative;
`;

const ArrowDownPurpleEditIcon = () => (
  <IconWrapper>
    <Image src="/icons/arrow_down_purple_edit.svg" alt="Arrow Down" fill />
  </IconWrapper>
);

export default ArrowDownPurpleEditIcon;
