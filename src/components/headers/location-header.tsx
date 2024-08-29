import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import TextGreyTextBold18 from "../texts/text-grey-text-bold-18";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/styles";

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
  border-bottom: 1px solid ${colors.grey_line};
`;

const LeftContainer = styled.div`
  width: 40px;
`;

const RightContainer = styled.div`
  width: 40px;
`;

const Title = styled(TextGreyTextBold18)``;

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
