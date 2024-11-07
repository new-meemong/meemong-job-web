import InfoTitle from "./info-title";
import { JobPostingType } from "@/types/job-posting-type";
import MultiInfoItem from "../../../components/details/multi-info-item";
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

type DetailInfoDesignerProps = Pick<
  JobPostingType,
  | "sex"
  | "age"
  // | "isRestrictedAge"
  | "designerLicenses"
  | "workType"
  | "workCycleTypes"
  | "designerExperienceYearNumber"
  | "salesLast3MonthsAvg"
>;

const DetailPersonInfoDesigner = ({
  sex,
  age,
  // isRestrictedAge,
  designerLicenses,
  workType,
  workCycleTypes,

  designerExperienceYearNumber,
  salesLast3MonthsAvg,
}: DetailInfoDesignerProps) => {
  return (
    <Container>
      <InfoTitle title={"구인 정보"} />
      <SingleInfoItem label={"성별"} content={sex} />
      <SingleInfoItem label={"나이"} content={age} />
      <SingleInfoItem label={"미용 라이센스 소유"} content={designerLicenses} />
      <SingleInfoItem label={"근무 형태"} content={workType} />
      <MultiInfoItem label={"근무 주기"} content={workCycleTypes} />

      <SingleInfoItem
        label={"디자이너 경력"}
        content={designerExperienceYearNumber}
      />
      <SingleInfoItem
        label={"이전 매장 매출 평균"}
        content={salesLast3MonthsAvg}
      />
    </Container>
  );
};

export default DetailPersonInfoDesigner;
