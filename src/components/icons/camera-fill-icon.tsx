import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  position: relative;
`;

const CameraFillIcon = () => (
  <IconWrapper>
    <Image src="/icons/camera_fill.svg" alt="Camera" fill />
  </IconWrapper>
);

export default CameraFillIcon;
