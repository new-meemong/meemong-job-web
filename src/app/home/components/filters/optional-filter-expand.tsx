import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import OptionalDropdownItem from "@/components/optional-dropdown-item";
import TextGreyText4Bold14 from "@/components/texts/text-grey-text4-bold-14";
import TextPrimaryBold14 from "@/components/texts/text-primary-bold-14";
import { colors } from "@/styles/colors";
import styled from "styled-components";
import OptionalFilter1 from "./optional-filter1";

const Container = styled.div`
  padding: 12px 8px;
  margin-top: 12px;
  border-radius: 4px;
  background-color: rgb(236, 234, 255, 0.4);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid ${colors.white};
`;

const HeaderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.white};
`;

const InitButton = styled(TextGreyText4Bold14)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 67px;
  height: 40px;
  background-color: ${colors.white};
  border-radius: 4px;
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: 223px;
  height: 40px;
  background-color: ${colors.purpleBackgroundActive};
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

const OptionalFilterExpand = ({
  resetFilters,
  toggleExpanded
}: OptionalFilterUnexpandButtonProps) => {
  return (
    <Container>
      <ButtonContainer>
        <InitButton onClick={resetFilters}>초기화</InitButton>
        <FilterExpandButton>
          <ExpandButtonText onClick={toggleExpanded}>
            맞춤형 인재 상세 닫기
          </ExpandButtonText>
          <ArrowDownPurpleIcon />
        </FilterExpandButton>
      </ButtonContainer>
      <OptionalDropdownItem
        label={"이전 3개월 평균 매출"}
        content={"상관없음"}
      />
      <OptionalFilter1 />
      <OptionalDropdownItem label={"희망 휴무일"} content={"상관없음"} />
      <OptionalDropdownItem label={"근무 주기"} content={"상관없음"} />
      <OptionalDropdownItem label={"기숙사"} content={"상관없음"} />
      <OptionalDropdownItem label={"희망 교육"} content={"상관없음"} />
      <OptionalDropdownItem label={"식대 지원"} content={"상관없음"} />
      <OptionalDropdownItem label={"주차 가능 여부"} content={"상관없음"} />
    </Container>
  );
};

export default OptionalFilterExpand;
