import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  position: relative;
`;

const DeleteIcon = () => (
  <IconWrapper>
    <Image src="/icons/delete.svg" alt="delete" fill />
  </IconWrapper>
);

export default DeleteIcon;
