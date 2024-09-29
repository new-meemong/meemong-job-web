import ArrowDownPurpleEditIcon from "@/components/icons/arrow-down-purple-edit-icon";
import ArrowUpPurpleEditIcon from "@/components/icons/arrow-up-purple-edit-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";
import MajorExperience from "./optional-field-section/major-experience";
import SalesLast3Month from "./optional-field-section/sales-last-3month";
import CompletedEducationLevel from "./optional-field-section/completed-education-level";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import PreferredOffDays from "./optional-field-section/preferred-off-days";

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
    appliedRole: state.appliedRole
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
          <CompletedEducationLevel />
          <PreferredOffDays />
        </ItemContainer>
      )}
    </Contianer>
  );
};

export default OptionalFieldSection;
