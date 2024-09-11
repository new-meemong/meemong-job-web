import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;
const CheckboxSelectIcon = () => (
  <IconWrapper>
    <Image src="/icons/checkbox_select.svg" alt="Checkbox Select" fill />
  </IconWrapper>
);

export default CheckboxSelectIcon;
