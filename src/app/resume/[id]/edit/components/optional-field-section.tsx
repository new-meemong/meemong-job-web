import ArrowDownPurpleEditIcon from "@/components/icons/arrow-down-purple-edit-icon";
import ArrowUpPurpleEditIcon from "@/components/icons/arrow-up-purple-edit-icon";
import CompletedEducationLevels from "./optional-field-section/completed-education-levels";
import Description from "./optional-field-section/description";
import DesignerPromotionPeriod from "./optional-field-section/designer-promition-period";
import IsPreferredDormitorySupport from "./optional-field-section/is-preferred-dormitory-support";
import IsPreferredMealSupport from "./optional-field-section/is-preferred-meal-support";
import IsPreferredParking from "./optional-field-section/is-preferred-parking";
import MajorExperience from "./optional-field-section/major-experience";
import Mbti from "./optional-field-section/mbti";
import PreferredMonthlyEducationDesignerCount from "./optional-field-section/preferred-monthly-education-designer-count";
import PreferredMonthlyEducationInternCount from "./optional-field-section/preferred-monthly-education-intern-count";
import PreferredOffDays from "./optional-field-section/preferred-off-days";
import SalesLast3Month from "./optional-field-section/sales-last-3month";
import WorkCycleTypes from "./optional-field-section/work-cycle-types";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { useState } from "react";

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: ${pxToVw(24)};
`;

const ExpandHeaderContainer = styled.div``;

const ExpandButtonText = styled.div`
  ${fonts.purplePrimaryBold14}
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ExpandButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(224, 221, 255, 0.4);
  border-radius: ${pxToVw(4)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(10)};
  padding-top: ${pxToVw(16)};
  padding-bottom: ${pxToVw(16)};
`;

const ExpandDescription = styled.div`
  ${fonts.purplePrimarySemi12}
  white-space: pre-wrap;
  text-align: center;
  margin-top: ${pxToVw(12)};
  margin-bottom: ${pxToVw(12)};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionalFieldSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { appliedRole } = useResumeEditStore((state) => ({
    appliedRole: state.appliedRole,
  }));
  return (
    <Contianer>
      <ExpandHeaderContainer>
        <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
          <ExpandButtonText>선택항목 입력 (11가지)</ExpandButtonText>
          {isExpanded ? <ArrowUpPurpleEditIcon /> : <ArrowDownPurpleEditIcon />}
        </ExpandButton>
        <ExpandDescription>{`이력서 작성 꿀팁!\n선택 항목을 많이 입력할 수록 제안 받을 확률이 올라갑니다.
        `}</ExpandDescription>
      </ExpandHeaderContainer>
      {isExpanded && (
        <ItemContainer>
          <MajorExperience />
          {appliedRole === "디자이너" && <SalesLast3Month />}
          <CompletedEducationLevels />
          <PreferredOffDays />
          <WorkCycleTypes />
          {appliedRole === "인턴" && <DesignerPromotionPeriod />}
          <IsPreferredDormitorySupport />
          {appliedRole === "디자이너" ? (
            <PreferredMonthlyEducationDesignerCount />
          ) : (
            <PreferredMonthlyEducationInternCount />
          )}
          <IsPreferredMealSupport />
          <IsPreferredParking />
          <Mbti />
          <Description />
        </ItemContainer>
      )}
    </Contianer>
  );
};

export default OptionalFieldSection;
