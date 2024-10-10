import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import { colors } from "@/styles/colors";
import styled from "styled-components";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import SalesLast3MonthsAvg from "../expand-filters/sales-last-3months-avg";
import CompletedEducationLevel from "../expand-filters/completed-education-level";
import PreferredOffDays from "../expand-filters/preferred-off-days";
import WorkCycleTypes from "../expand-filters/work-cycle-types";
import IsPreferredDormitorySupport from "../expand-filters/is-preferred-dormitory-support";
import { useResumeListStore } from "@/stores/resume-list-store";
import PreferredMonthlyEducationCountDesigner from "../expand-filters/preferred-monthly-education-count-designer";
import PreferredMonthlyEducationCountIntern from "../expand-filters/preferred-monthly-education-count-intern";
import IsPreferredMealSupport from "../expand-filters/is-preferred-meal-support";
import IsPreferredParking from "../expand-filters/is-preferred-parking";
import DesignerPromotionPeriod from "../expand-filters/designer-promotion-period";

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

// const HeaderLine = styled.div`
//   width: 100%;
//   height: ${pxToVw(1)};
//   background-color: ${colors.white};
// `;

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

const ResumeOptionalFilterExpand = ({
  resetFilters,
  toggleExpanded
}: OptionalFilterUnexpandButtonProps) => {
  const { getResumeFilterQuery } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery
  }));
  const appliedRole = getResumeFilterQuery("appliedRole");
  return (
    <Container>
      <ButtonContainer>
        <InitButton onClick={resetFilters}>초기화</InitButton>
        <FilterExpandButton onClick={toggleExpanded}>
          <ExpandButtonText>맞춤형 인재 상세 닫기</ExpandButtonText>
          <ArrowDownPurpleIcon />
        </FilterExpandButton>
      </ButtonContainer>
      {appliedRole === "디자이너" && <SalesLast3MonthsAvg />}

      <CompletedEducationLevel />
      <PreferredOffDays />
      <WorkCycleTypes />
      {appliedRole === "인턴" && <DesignerPromotionPeriod />}
      <IsPreferredDormitorySupport />
      {appliedRole === "디자이너" && <PreferredMonthlyEducationCountDesigner />}
      {appliedRole === "인턴" && <PreferredMonthlyEducationCountIntern />}
      <IsPreferredMealSupport />
      <IsPreferredParking />
    </Container>
  );
};

export default ResumeOptionalFilterExpand;
