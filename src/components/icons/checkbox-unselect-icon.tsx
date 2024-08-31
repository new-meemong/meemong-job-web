import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;
const CheckboxUnselectIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/checkbox_unselect.svg"
      alt="Checkbox Unselect"
      layout="fill"
      objectFit="contain"
    />
  </IconWrapper>
);

export default CheckboxUnselectIcon;
