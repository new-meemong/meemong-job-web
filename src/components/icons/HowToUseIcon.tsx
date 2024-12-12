import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
  position: relative;
`;

const HowToUseIcon = () => (
  <IconWrapper>
    <Image src="/icons/how_to_use.svg" alt="How to use" fill />
  </IconWrapper>
);

export default HowToUseIcon;
