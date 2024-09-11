import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;
const WriteIcon = () => (
  <IconWrapper>
    <Image src="/icons/write.svg" alt="Write" fill />
  </IconWrapper>
);

export default WriteIcon;
