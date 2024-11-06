import InfoTitle from "./info-title";
import { JobPostingType } from "@/types/job-posting-type";
import SingleInfoItem from "../../../components/details/single-info-item";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

type BasicInfoInternProps = Pick<
  JobPostingType,
  | "storeRegion"
  | "monthlyEducationCount"
  | "educationCost"
  | "availableOffDays"
  | "internSalary"
  | "role"
>;

const BasicInfoIntern = ({
  storeRegion,
  monthlyEducationCount,
  educationCost,
  availableOffDays,
  internSalary,
  role,
}: BasicInfoInternProps) => {
  return (
    <Container>
      <InfoTitle title={"기본 정보"} />
      <SingleInfoItem label={"모집 유형"} content={role} />
      <SingleInfoItem label={"지역"} content={storeRegion} />
      <SingleInfoItem label={"교육"} content={monthlyEducationCount} />
      <SingleInfoItem label={"교육비"} content={educationCost} />
      <SingleInfoItem label={"휴무 가능 요일"} content={availableOffDays} />
      <SingleInfoItem label={"급여"} content={internSalary} />
    </Container>
  );
};

export default BasicInfoIntern;
