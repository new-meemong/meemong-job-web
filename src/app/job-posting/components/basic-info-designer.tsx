import styled from "styled-components";
import InfoTitle from "./info-title";
import SingleInfoItem from "./single-info-item";
import pxToVw from "@/lib/dpi-converter";
import SingleInfoTooltipItem from "./single-info-tooltip-item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
`;

type BasicInfoDesignerProps = Pick<
  JobPosting,
  | "storeRegion"
  | "monthlyEducationCount"
  | "availableOffDays"
  | "settlementAllowance"
  | "incentive"
>;

const BasicInfoDesigner = ({
  storeRegion,
  monthlyEducationCount,
  availableOffDays,
  settlementAllowance,
  incentive
}: BasicInfoDesignerProps) => {
  return (
    <Container>
      <InfoTitle title={"기본정보"} />
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
