import pxToVw from "@/lib/dpi-converter";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToVw(40)};
  height: ${pxToVw(40)};
`;

const IconWrapper = styled.div`
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  position: relative;
`;

const BackIcon = () => {
  return (
    <Container>
      <IconWrapper>
        <Image src="/icons/headers/back.svg" alt="Back" fill />
      </IconWrapper>
    </Container>
  );
};

export default BackIcon;
