import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import InfoTitle from "./info-title";
import SingleInfoItem from "../../../components/details/single-info-item";
import MultiInfoItem from "../../../components/details/multi-info-item";
import { JobPostingType } from "@/types/job-posting-type";

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
  | "isRestrictedAge"
  | "designerLicenses"
  | "workType"
  | "workCycleTypes"
  | "internExperienceYearNumber"
  | "isExistedFourInsurances"
  | "isExistedRetirementPay"
>;

const DetailPersonInfoIntern = ({
  sex,
  isRestrictedAge,
  designerLicenses,

  workType,
  workCycleTypes,
  internExperienceYearNumber,

  isExistedFourInsurances,
  isExistedRetirementPay
}: DetailInfoInternProps) => {
  console.log("internExperienceYearNumber", internExperienceYearNumber);
  return (
    <Container>
      <InfoTitle title={"구인 정보"} />
      <SingleInfoItem label={"성별"} content={sex} />
      <SingleInfoItem
        label={"나이"}
        content={isRestrictedAge ? "나이 제한" : "나이 무관"}
      />
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