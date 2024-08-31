import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 52px;
  padding-bottom: 12px;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid ${colors.greyLine};
`;

const LeftContainer = styled.div`
  width: 40px;
`;

const RightContainer = styled.div`
  width: 40px;
`;

const Title = styled.span`
  ${fonts.greyTextBold18}
`;

const LocationHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>지역 선택 필터</Title>
      <RightContainer />
    </Container>
  );
};

export default LocationHeader;
