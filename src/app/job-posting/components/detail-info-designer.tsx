import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import InfoTitle from "./info-title";
import SingleInfoItem from "./single-info-item";
import MultiInfoItem from "./multi-info-item";
import { formatPriceWithCommas } from "@/lib/price-comma";
import { JobPostingType } from "@/types/job-posting-type";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
`;

type DetailInfoDesignerProps = Pick<
  JobPostingType,
  | "sex"
  | "isRestrictedAge"
  | "designerLicenses"
  | "storeTypes"
  | "employeeCount"
  | "isExistedInternSystem"
  | "storeInteriorRenovationAgo"
  | "workCycleTypes"
  | "isExistedEducationSupport"
  | "isExistedMealSupport"
  | "mealTime"
  | "isExistedProductSupport"
  | "isExistedDormitorySupport"
  | "salesCommission"
  | "designerExperienceYearNumber"
  | "salesLast3MonthsAvg"
  | "subwayAccessibility"
  | "adminAge"
  | "adminSex"
  | "leaveDayCount"
  | "parkingSpotCount"
  | "isExistedCleaningSupplier"
  | "isExistedTowelSupplier"
  | "basicCutPrice"
  | "startWorkTime"
  | "endWorkTime"
  | "storeUrl"
  | "mainHairDye"
>;

const DetailInfoDesigner = ({
  sex,
  isRestrictedAge,
  designerLicenses,
  storeTypes,
  employeeCount,
  isExistedInternSystem,
  storeInteriorRenovationAgo,
  workCycleTypes,
  isExistedEducationSupport,
  isExistedMealSupport,
  mealTime,
  isExistedProductSupport,
  isExistedDormitorySupport,
  salesCommission,
  designerExperienceYearNumber,
  salesLast3MonthsAvg,
  subwayAccessibility,
  adminAge,
  adminSex,
  leaveDayCount,
  parkingSpotCount,
  isExistedCleaningSupplier,
  isExistedTowelSupplier,
  basicCutPrice,
  startWorkTime,
  endWorkTime,
  storeUrl,
  mainHairDye
}: DetailInfoDesignerProps) => {
  return (
    <Container>
      <InfoTitle title={"매장 상세 정보"} />
      <SingleInfoItem label={"성별"} content={sex} />
      <SingleInfoItem
        label={"연령"}
        content={isRestrictedAge ? "연령제한" : "연령무관"}
      />
      <SingleInfoItem label={"자격증"} content={designerLicenses} />
      <MultiInfoItem label={"매장 유형"} content={storeTypes} />
      <SingleInfoItem label={"현재 직원수"} content={employeeCount} />
      <SingleInfoItem label={"인턴 시스템"} content={isExistedInternSystem} />
      <SingleInfoItem
        label={"매장 인테리어"}
        content={storeInteriorRenovationAgo}
      />
      <MultiInfoItem label={"근무 주기"} content={workCycleTypes} />
      <SingleInfoItem
        label={"교육비 지원"}
        content={isExistedEducationSupport}
      />
      <SingleInfoItem label={"식대 지원"} content={isExistedMealSupport} />
      <SingleInfoItem label={"식사 시간"} content={mealTime} />
      <SingleInfoItem
        label={"시술제품 지원"}
        content={isExistedProductSupport}
      />
      <SingleInfoItem label={"기숙사"} content={isExistedDormitorySupport} />
      <SingleInfoItem label={"점판 수당"} content={salesCommission} />
      <SingleInfoItem
        label={"디자이너 경력"}
        content={designerExperienceYearNumber}
      />
      <SingleInfoItem
        label={"이전 3개월 매출 평균"}
        content={salesLast3MonthsAvg}
      />
      <SingleInfoItem label={"지하철 접근성"} content={subwayAccessibility} />
      <SingleInfoItem label={"관리자 나이"} content={adminAge} />
      <SingleInfoItem label={"관리자 성별"} content={adminSex} />
      <SingleInfoItem label={"휴가 일수"} content={leaveDayCount} />
      <SingleInfoItem
        label={"매장 주차 가능 대수"}
        content={parkingSpotCount}
      />
      <SingleInfoItem label={"청소 업체"} content={isExistedCleaningSupplier} />
      <SingleInfoItem label={"수건 업체"} content={isExistedTowelSupplier} />
      <SingleInfoItem
        label={"기본 컷트가격"}
        content={`${formatPriceWithCommas(basicCutPrice || 0)}원`}
      />
      <SingleInfoItem
        label={"근무 시간"}
        content={`${startWorkTime || "00:00"} ~ ${endWorkTime || "00:00"}`}
      />
      <SingleInfoItem label={"매장 링크"} content={storeUrl || ""} />
      <SingleInfoItem label={"메인 염모제"} content={mainHairDye || ""} />
    </Container>
  );
};

export default DetailInfoDesigner;
