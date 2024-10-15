import styled from "styled-components";
import SectionTitle from "./base/section-title";
import { ResumeType } from "@/types/resume-type";
import SingleInfoItem from "@/components/details/single-info-item";
import pxToVw from "@/lib/dpi-converter";
import { convertRegion, convertToShortRegion } from "@/lib/convert-region";
import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
`;

interface RequiredInfoSectionProps {
  resume: ResumeType;
}

const RequiredInfoSection = ({ resume }: RequiredInfoSectionProps) => {
  const { preferredStoreRegions, preferredStoreRegionSiNames } = resume;
  const _convertedRegions = convertRegion({
    storeRegions: preferredStoreRegions,
    storeRegionsSiNames: preferredStoreRegionSiNames
  });

  const _convertedShortRegions = convertToShortRegion(_convertedRegions);

  return (
    <Container>
      <SectionTitle title="기본 정보" />
      <SingleInfoItem label="이름" content={resume.userName} />
      <SingleInfoItem label="성별" content={resume.sex ? resume.sex : ""} />
      <SingleInfoItem label="근무 희망 지역" content={_convertedShortRegions} />
      <SingleInfoItem
        label="나이"
        content={`${moment()
          .diff(moment(resume.birthday, "YYYY-MM-DD"), "years")
          .toString()}세`}
      />
      <SingleInfoItem label="지원 분야" content={resume.appliedRole} />
      <SingleInfoItem label="근무 형태" content={resume.workType} />
      {resume.appliedRole === "디자이너" && (
        <SingleInfoItem
          label="정착지원금"
          content={resume.settlementAllowance}
        />
      )}
      {resume.appliedRole === "인턴" && (
        <SingleInfoItem
          label="희망 급여"
          content={resume.internExpectedSalary}
        />
      )}
      <SingleInfoItem
        label="미용 라이센스 소유"
        content={resume.designerLicenses}
        nullString="없음"
      />
      {resume.appliedRole === "디자이너" && (
        <SingleInfoItem
          label="경력"
          content={resume.designerExperienceYearNumber}
        />
      )}
      {resume.appliedRole === "인턴" && (
        <SingleInfoItem
          label="경력"
          content={resume.internExperienceYearNumber}
        />
      )}
    </Container>
  );
};

export default RequiredInfoSection;
