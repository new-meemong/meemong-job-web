import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import TextGreyText4Bold14 from "@/components/texts/text-grey-text4-bold-14";
import TextPrimaryBold14 from "@/components/texts/text-primary-bold-14";
import { colors } from "@/styles/styles";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
`;

const InitButton = styled(TextGreyText4Bold14)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 40px;
  background-color: ${colors.grey_background};
  border-radius: 4px;
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 236px;
  height: 40px;
  background-color: ${colors.purple_background_active};
  border-radius: 4px;
  padding: 0 10px;
`;

const ExpandButtonText = styled(TextPrimaryBold14)`
  width: 205px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface OptionalFilterUnexpandButtonProps {
  resetFilters: () => void;
  toggleExpanded: () => void;
}

const OptionalFilterUnexpand = ({
  resetFilters,
  toggleExpanded
}: OptionalFilterUnexpandButtonProps) => {
  return (
    <ButtonContainer>
      <InitButton onClick={resetFilters}>초기화</InitButton>
      <FilterExpandButton>
        <ExpandButtonText onClick={toggleExpanded}>
          맞춤형 인재 상세 찾기
        </ExpandButtonText>
        <ArrowDownPurpleIcon />
      </FilterExpandButton>
    </ButtonContainer>
  );
};

export default OptionalFilterUnexpand;
