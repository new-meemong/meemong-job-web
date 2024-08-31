import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import OptionalDropdownItem from "@/components/optional-dropdown-item";
import { colors } from "@/styles/colors";
import styled from "styled-components";
import OptionalFilter1 from "./options-filter-expand-items/optional-filter1";
import OptionalFilter2 from "./options-filter-expand-items/optional-filter2";
import OptionalFilter3 from "./options-filter-expand-items/optional-filter3";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  padding: ${pxToVw(12)} ${pxToVw(8)};
  margin-top: ${pxToVw(12)};
  border-radius: ${pxToVw(4)};
  background-color: rgb(236, 234, 255, 0.4);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${pxToVw(12)};
  border-bottom: ${pxToVw(1)} solid ${colors.white};
`;

const HeaderLine = styled.div`
  width: 100%;
  height: ${pxToVw(1)};
  background-color: ${colors.white};
`;

const InitButton = styled.div`
  ${fonts.greyText4Bold14}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${pxToVw(67)};
  height: ${pxToVw(40)};
  background-color: ${colors.white};
  border-radius: ${pxToVw(4)};
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: ${pxToVw(223)};
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

const OptionalFilterExpand = ({
  resetFilters,
  toggleExpanded
}: OptionalFilterUnexpandButtonProps) => {
  return (
    <Container>
      <ButtonContainer>
        <InitButton onClick={resetFilters}>초기화</InitButton>
        <FilterExpandButton onClick={toggleExpanded}>
          <ExpandButtonText>맞춤형 인재 상세 닫기</ExpandButtonText>
          <ArrowDownPurpleIcon />
        </FilterExpandButton>
      </ButtonContainer>
      <OptionalFilter1 />
      <OptionalFilter2 />
      <OptionalFilter3 />
      <OptionalDropdownItem label={"근무 주기"} content={"상관없음"} />
      <OptionalDropdownItem label={"기숙사"} content={"상관없음"} />
      <OptionalDropdownItem label={"희망 교육"} content={"상관없음"} />
      <OptionalDropdownItem label={"식대 지원"} content={"상관없음"} />
      <OptionalDropdownItem label={"주차 가능 여부"} content={"상관없음"} />
    </Container>
  );
};

export default OptionalFilterExpand;
