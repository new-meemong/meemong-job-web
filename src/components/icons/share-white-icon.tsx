import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(17)};
  height: ${pxToVw(17)};
  position: relative;
`;

const ShareWhiteIcon = () => (
  <IconWrapper>
    <Image src="/icons/share_white.svg" alt="Share" fill />
  </IconWrapper>
);

export default ShareWhiteIcon;
