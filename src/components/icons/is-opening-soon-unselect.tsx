import Image from "next/image";
import React from "react";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;

const IsOpeningSoonUnselectIcon = () => (
  <IconWrapper>
    <Image
      src="/icons/is_opening_soon_unselect.svg"
      alt="Is Opening Soon"
      fill
    />
  </IconWrapper>
);

export default IsOpeningSoonUnselectIcon;