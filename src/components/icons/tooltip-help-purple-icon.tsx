import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(18)};
  height: ${pxToVw(19)};
  position: relative;
`;

const TooltipHelpPurpleIcon = () => (
  <IconWrapper>
    <Image src="/icons/tooltip_help.svg" alt="Tootip Help" fill />
  </IconWrapper>
);

export default TooltipHelpPurpleIcon;
