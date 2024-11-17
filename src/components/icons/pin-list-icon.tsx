import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(12)};
  height: ${pxToVw(12)};
  position: relative;
`;

const PinListIcon = () => (
  <IconWrapper>
    <Image src="/icons/pin_list.svg" alt="pin list" fill />
  </IconWrapper>
);

export default PinListIcon;
