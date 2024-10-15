import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(19)};
  height: ${pxToVw(19)};
  position: relative;
`;

const CopyBlackIcon = () => (
  <IconWrapper>
    <Image src="/icons/copy.svg" alt="Copy" fill />
  </IconWrapper>
);

export default CopyBlackIcon;
