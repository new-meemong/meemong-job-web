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

type DetailInfoInternProps = Pick<
  JobPostingType,
  | "storeTypes"
  | "employeeCount"
  | "isExistedInternSystem"
  | "storeInteriorRenovationAgo"
  | "isExistedMealSupport"
  | "mealTime"
  | "isExistedProductSupport"
  | "isExistedDormitorySupport"
  | "salesCommission"
  | "designerPromotionPeriod"
  | "subwayAccessibility"
  | "adminAge"
  | "adminSex"
  | "leaveDayCount"
  | "parkingSpotCount"
  | "isExistedCleaningSupplier"
  | "isExistedTowelSupplier"
  | "isOnsiteManager"
>;

const DetailStoreInfoIntern = ({
  storeTypes,
  employeeCount,
  isExistedInternSystem,
  storeInteriorRenovationAgo,
  isExistedMealSupport,
  mealTime,
  isExistedProductSupport,
  isExistedDormitorySupport,
  salesCommission,

  designerPromotionPeriod,
  subwayAccessibility,
  adminAge,
  adminSex,
  leaveDayCount,
  parkingSpotCount,
  isExistedCleaningSupplier,
  isExistedTowelSupplier,
  isOnsiteManager,
}: DetailInfoInternProps) => {
  return (
    <Container>
      <InfoTitle title={"매장 정보"} />

      <MultiInfoItem label={"매장 형태"} content={storeTypes} />
      <SingleInfoItem label={"현재 직원수"} content={employeeCount} />
      <SingleInfoItem
        label={"인턴배정 시스템"}
        content={isExistedInternSystem}
      />
      <SingleInfoItem
        label={"인턴기간 · 승급 포함"}
        content={designerPromotionPeriod}
      />
      <SingleInfoItem
        label={"매장 인테리어"}
        content={storeInteriorRenovationAgo}
      />
      <SingleInfoItem label={"식대 지원"} content={isExistedMealSupport} />
      <SingleInfoItem label={"식사 시간"} content={mealTime} />
      <SingleInfoItem
        label={"시술제품 지원"}
        content={isExistedProductSupport}
      />
      <SingleInfoItem label={"기숙사"} content={isExistedDormitorySupport} />
      <SingleInfoItem label={"점판 수당"} content={salesCommission} />
      <SingleInfoItem label={"지하철 접근성"} content={subwayAccessibility} />
      <SingleInfoItem label={"관리자 성별"} content={adminSex} />
      <SingleInfoItem label={"관리자 나이"} content={adminAge} />
      <SingleInfoItem label={"휴가 일수"} content={leaveDayCount} />
      <SingleInfoItem
        label={"매장 주차 가능 대수"}
        content={parkingSpotCount}
      />
      <SingleInfoItem label={"청소 업체"} content={isExistedCleaningSupplier} />
      <SingleInfoItem label={"수건 업체"} content={isExistedTowelSupplier} />
      <SingleInfoItem label={"샵 매니저 상주"} content={isOnsiteManager} />
    </Container>
  );
};

export default DetailStoreInfoIntern;
