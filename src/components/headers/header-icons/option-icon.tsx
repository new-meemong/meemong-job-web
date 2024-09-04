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
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  position: relative;
`;

const OptionIcon = () => {
  return (
    <Container>
      <IconWrapper>
        <Image
          src="/icons/headers/option.svg"
          alt="Back"
          layout="fill"
          objectFit="contain"
        />
      </IconWrapper>
    </Container>
  );
};

export default OptionIcon;
