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

type BasicInfoInternProps = Pick<
  JobPosting,
  | "storeRegion"
  | "monthlyEducationCount"
  | "educationCost"
  | "availableOffDays"
  | "internSalary"
>;

const BasicInfoIntern = ({
  storeRegion,
  monthlyEducationCount,
  educationCost,
  availableOffDays,
  internSalary
}: BasicInfoInternProps) => {
  return (
    <Container>
      <InfoTitle title={"기본정보"} />
      <SingleInfoItem label={"지역"} content={storeRegion} />
      <SingleInfoItem label={"교육"} content={monthlyEducationCount} />
      <SingleInfoItem label={"교육비"} content={educationCost} />
      <SingleInfoItem label={"휴무 가능 요일"} content={availableOffDays} />
      <SingleInfoItem label={"급여"} content={internSalary} />
    </Container>
  );
};

export default BasicInfoIntern;
