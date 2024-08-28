import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const BackIcon = () => {
  return (
    <Container>
      <Image src="/icons/headers/back.svg" alt="Back" width={10} height={16} />
    </Container>
  );
};

export default BackIcon;
