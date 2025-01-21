import InfoTitle from "./info-title";
import { JobPostingType } from "@/types/job-posting-type";
import MultiInfoItem from "../../../components/details/MultiInfoItem";
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

type DetailInfoInternProps = Pick<
  JobPostingType,
  | "sex"
  | "age"
  | "designerLicenses"
  | "workType"
  | "workCycleTypes"
  | "internExperienceYearNumber"
  | "isExistedFourInsurances"
  | "isExistedRetirementPay"
>;

const DetailPersonInfoIntern = ({
  sex,
  age,

  designerLicenses,

  workType,
  workCycleTypes,
  internExperienceYearNumber,

  isExistedFourInsurances,
  isExistedRetirementPay,
}: DetailInfoInternProps) => {
  console.log("internExperienceYearNumber", internExperienceYearNumber);
  return (
    <Container>
      <InfoTitle title={"구인 정보"} />
      <SingleInfoItem label={"성별"} content={sex} />
      <SingleInfoItem label={"나이"} content={age} />
      <SingleInfoItem label={"미용 라이센스 소유"} content={designerLicenses} />

      <MultiInfoItem label={"근무 형태"} content={workType} />
      <MultiInfoItem label={"근무 주기"} content={workCycleTypes} />

      <SingleInfoItem
        label={"인턴 경력"}
        content={internExperienceYearNumber}
      />

      <SingleInfoItem label={"4대 보험"} content={isExistedFourInsurances} />
      <SingleInfoItem label={"퇴직금"} content={isExistedRetirementPay} />
    </Container>
  );
};

export default DetailPersonInfoIntern;
