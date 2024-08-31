import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 12px;
`;

const InitButton = styled.div`
  ${fonts.greyText4Bold14}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 40px;
  background-color: ${colors.greyBackground};
  border-radius: 4px;
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 236px;
  height: 40px;
  background-color: ${colors.purpleBackgroundActive};
  border-radius: 4px;
  padding: 0 10px;
`;

const ExpandButtonText = styled.span`
  ${fonts.purplePrimaryBold14}
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
