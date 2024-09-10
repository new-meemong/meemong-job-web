import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(30)};
  height: ${pxToVw(30)};
  position: relative;
`;

const CancelGreyIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/headers/cancel.svg"
      alt="Close"
      layout="fill"
      objectFit="contain"
    />
  </IconWrapper>
);

export default CancelGreyIcon;
