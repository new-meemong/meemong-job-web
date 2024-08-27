import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import TextGreyBold14 from "@/components/texts/text-grey-bold-14";
import TextPrimaryBold14 from "@/components/texts/text-primary-bold-14";
import { colors } from "@/styles/styles";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;
`;

const InitButton = styled(TextGreyBold14)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 40px;
  background-color: ${colors.grey_background};
  border-radius: 4px;
`;

const SearchDetailButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 236px;
  height: 40px;
  background-color: ${colors.purple_background_active};
  border-radius: 4px;
  padding: 0 10px;
`;

const SearchDetailText = styled(TextPrimaryBold14)`
  width: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionDetailButton = () => {
  return (
    <Container>
      <InitButton>초기화</InitButton>
      <SearchDetailButton>
        <SearchDetailText>맞춤형 인재 상세 찾기</SearchDetailText>
        <ArrowDownPurpleIcon />
      </SearchDetailButton>
    </Container>
  );
};

export default OptionDetailButton;
