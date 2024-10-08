import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: ${pxToVw(12)};
`;

const InitButton = styled.div`
  ${fonts.greyText4Bold14}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${pxToVw(67)};
  height: ${pxToVw(40)};
  background-color: ${colors.greyBackground};
  border-radius: ${pxToVw(4)};
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: ${pxToVw(236)};
  height: ${pxToVw(40)};
  background-color: ${colors.purpleBackgroundActive};
  border-radius: ${pxToVw(4)};
  padding: ${pxToVw(0)} ${pxToVw(10)};
`;

const ExpandButtonText = styled.span`
  ${fonts.purplePrimaryBold14}
  width: ${pxToVw(205)};
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
