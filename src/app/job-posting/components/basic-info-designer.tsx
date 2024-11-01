import styled from "styled-components";
import InfoTitle from "./info-title";
import SingleInfoItem from "../../../components/details/single-info-item";
import pxToVw from "@/lib/dpi-converter";
import SingleInfoTooltipItem from "./single-info-tooltip-item";
import { JobPostingType } from "@/types/job-posting-type";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

type BasicInfoDesignerProps = Pick<
  JobPostingType,
  | "storeRegion"
  | "monthlyEducationCount"
  | "availableOffDays"
  | "settlementAllowance"
  | "incentive"
  | "role"
>;

const BasicInfoDesigner = ({
  storeRegion,
  monthlyEducationCount,
  availableOffDays,
  settlementAllowance,
  incentive,
  role
}: BasicInfoDesignerProps) => {
  return (
    <Container>
      <InfoTitle title={"기본 정보"} />
      <SingleInfoItem label={"모집 유형"} content={role} />
      <SingleInfoItem label={"지역"} content={storeRegion} />
      <SingleInfoItem label={"교육"} content={monthlyEducationCount} />
      <SingleInfoItem label={"휴무 가능 요일"} content={availableOffDays} />
      <SingleInfoItem label={"정착지원금"} content={settlementAllowance} />
      <SingleInfoTooltipItem
        label={"인센티브"}
        content={`1,000만원 / ${incentive}`}
        tooltip={`월 매출 1,000만원 시\n인센티브를 퍼센트로 지급합니다.`}
      />
    </Container>
  );
};

export default BasicInfoDesigner;
