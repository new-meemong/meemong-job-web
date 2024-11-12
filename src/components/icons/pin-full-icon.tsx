import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  position: relative;
`;

const PinFullIcon = () => (
  <IconWrapper>
    <Image src="/icons/pin_full.svg" alt="pin full" fill />
  </IconWrapper>
);

export default PinFullIcon;
