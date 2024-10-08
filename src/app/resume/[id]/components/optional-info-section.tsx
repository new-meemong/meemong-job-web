import pxToVw from "@/lib/dpi-converter";
import { ResumeType } from "@/types/resume-type";
import styled from "styled-components";
import SectionTitle from "./base/section-title";
import SingleInfoItem from "@/components/details/single-info-item";
import MultiInfoItem from "@/components/details/multi-info-item";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
`;

interface OptionalInfoSectionProps {
  resume: ResumeType;
}

const OptionalInfoSection = ({ resume }: OptionalInfoSectionProps) => {
  return (
    <Container>
      <SectionTitle title="세부 이력 및 선호도" />
      {resume.appliedRole === "디자이너" && (
        <MultiInfoItem
          label="대표 근무 이력"
          content={`${resume.designerMajorExperienceCompanyName},${resume.designerMajorExperienceDuration} / ${resume.designerMajorExperienceRole}`}
          nullString="없음"
        />
      )}
      {resume.appliedRole === "인턴" && (
        <MultiInfoItem
          label="대표 근무 이력"
          content={`${resume.internMajorExperienceCompanyName},${resume.internMajorExperienceDuration} / ${resume.internMajorExperienceRole}`}
          nullString="없음"
        />
      )}
      {resume.appliedRole === "디자이너" && (
        <SingleInfoItem
          label="이전 3개월 평균 매출"
          content={resume.salesLast3MonthsAvg}
        />
      )}
      <SingleInfoItem
        label="학력"
        content={resume.completedEducationLevel}
        nullString="없음"
      />
      <SingleInfoItem label="희망 휴무일" content={resume.preferredOffDays} />
      <SingleInfoItem label="근무 주기" content={resume.workCycleTypes} />
      {resume.appliedRole === "인턴" && (
        <SingleInfoItem
          label="디자이너 승급기간"
          content={resume.designerPromotionPeriod}
        />
      )}
      <SingleInfoItem
        label="기숙사"
        content={resume.isPreferredDormitorySupport ? "필요함" : "필요없음"}
      />
      <SingleInfoItem
        label="희망 교육"
        content={resume.preferredMonthlyEducationCount}
      />
      <SingleInfoItem
        label="식대 지원"
        content={resume.isPreferredMealSupport ? "희망" : "필요없음"}
      />
      <SingleInfoItem
        label="주차 희망 여부"
        content={resume.isPreferredParking ? "희망" : "필요없음"}
      />
      <SingleInfoItem label="MBTI" content={resume.mbti} />
    </Container>
  );
};

export default OptionalInfoSection;
