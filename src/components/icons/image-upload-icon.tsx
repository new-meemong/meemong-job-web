import React from "react";
import Image from "next/image";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const IconWrapper = styled.div`
  width: ${pxToVw(72)};
  height: ${pxToVw(72)};
  position: relative;
  object-fit: contain;
`;

const ImageUploadIcon = () => (
  <IconWrapper>
    <Image src="/icons/image_upload.svg" alt="Image Upload" fill />
  </IconWrapper>
);

export default ImageUploadIcon;
