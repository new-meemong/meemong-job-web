import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(18)};
  height: ${pxToVw(19)};
  position: relative;
`;

const TooltipIcon = () => (
  <IconWrapper>
    <Image src="/icons/tooltip.svg" alt="Tooltip" fill />
  </IconWrapper>
);

export default TooltipIcon;
