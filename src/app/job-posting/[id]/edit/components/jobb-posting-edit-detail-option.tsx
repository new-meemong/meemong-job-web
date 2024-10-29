import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import SelectSex from "./detail-option-components/select-sex";
import SelectIsRestrictedAge from "./detail-option-components/select-is-restricted-age";
import CheckIsPossibleMiddleAge from "./detail-option-components/check-is-possible-middle-age";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import SelectDesignerLicense from "./detail-option-components/select-designer-license";
import SelectStoreTypes from "./detail-option-components/select-store-types";
import SelectEmployeeCount from "./detail-option-components/select-employee-count";
import SelectIsExistedInternSystem from "./detail-option-components/select-is-existed-intern-system";
import SelectStoreInteriorRenovationAgo from "./detail-option-components/select-store-interior-renovation-ago";
import SelectWorkType from "./detail-option-components/select-work-type";
import SelectWorkCycle from "./detail-option-components/select-work-cycle";
import SelectIsExistedEducationSupport from "./detail-option-components/select-is-existed-education-support";
import SelectIsExistedMealSupport from "./detail-option-components/select-is-existed-meal-support";
import SelectMealTime from "./detail-option-components/select-meal-time";
import SelectIsExistedProductSupport from "./detail-option-components/select-is-existed-product-support";
import SelectIsExistedDormitorySupport from "./detail-option-components/select-is-existed-dormitory-support";
import SelectSalesCommission from "./detail-option-components/select-sales-commission";
import SelectDesignerExperienceYearNumber from "./detail-option-components/select-designer-experience-year-number";
import SelectSalesLast3MonthAvg from "./detail-option-components/select-sales-last-3month-avg";
import SelectSubwayAccessibility from "./detail-option-components/select-subway-accessibility";
import SelectAdminAge from "./detail-option-components/select-admin-age";
import SelectAdminSex from "./detail-option-components/select-admin-sex";
import SelectLeaveDayCount from "./detail-option-components/select-leave-day-count";
import SelectParkingSpotCount from "./detail-option-components/select-parking-spot-count";
import SelectIsExistedCleaningSupplier from "./detail-option-components/select-is-existed-cleaning-supplier";
import SelectIsExistedTowelSupplier from "./detail-option-components/select-is-existed-towel-supplier";
import InputBasicCutPrice from "./detail-option-components/input-basic-cut-price";
import SelectDesignerPromotionPeriod from "./detail-option-components/select-designer-promotion-period";
import SelectInternExperienceYearNumber from "./detail-option-components/select-intern-experience-year-number";
import SelectIsOnsiteManger from "./detail-option-components/select-is-onsite-manager";
import SelectIsExistedRetirementPay from "./detail-option-components/select-is-existed-retirement-pay";
import SelectIsExistedFourInsurance from "./detail-option-components/select-is-existed-four-insurance";

const Container = styled.div`
  background-color: #eceaff66;
  border-radius: ${pxToVw(4)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(12)};
  margin-top: ${pxToVw(20)};
`;

const HeaderLabel = styled.div`
  ${fonts.greyTextEditLabelBold16}
  height: ${pxToVw(30)};
  display: flex;
  align-items: center;
`;

const DesignerOptions = () => {
  const { isRestrictedAge } = useJobPostingEditStore();

  return (
    <>
      <SelectSex />
      <SelectIsRestrictedAge />
      {isRestrictedAge && <CheckIsPossibleMiddleAge />}
      <SelectDesignerLicense />
      <SelectStoreTypes />
      <SelectEmployeeCount />
      <SelectIsExistedInternSystem />
      <SelectStoreInteriorRenovationAgo />
      <SelectWorkType />
      <SelectWorkCycle />
      <SelectIsExistedEducationSupport />
      <SelectIsExistedMealSupport />
      <SelectMealTime />
      <SelectIsExistedProductSupport />
      <SelectIsExistedDormitorySupport />
      <SelectSalesCommission />
      <SelectDesignerExperienceYearNumber />
      <SelectSalesLast3MonthAvg />
      <SelectSubwayAccessibility />
      <SelectAdminAge />
      <SelectAdminSex />
      <SelectLeaveDayCount />
      <SelectParkingSpotCount />
      <SelectIsExistedCleaningSupplier />
      <SelectIsExistedTowelSupplier />
      <SelectIsOnsiteManger />
      <InputBasicCutPrice />
    </>
  );
};

const InternOptions = () => {
  const { isRestrictedAge } = useJobPostingEditStore();

  return (
    <>
      <SelectSex />
      <SelectIsRestrictedAge />
      {isRestrictedAge && <CheckIsPossibleMiddleAge />}
      <SelectDesignerLicense />
      <SelectStoreTypes />
      <SelectEmployeeCount />
      <SelectIsExistedInternSystem />
      <SelectDesignerPromotionPeriod />
      <SelectStoreInteriorRenovationAgo />
      <SelectWorkType />
      <SelectWorkCycle />
      <SelectIsExistedMealSupport />
      <SelectMealTime />
      <SelectIsExistedProductSupport />
      <SelectIsExistedDormitorySupport />
      <SelectSalesCommission />
      <SelectInternExperienceYearNumber />
      <SelectSubwayAccessibility />
      <SelectAdminAge />
      <SelectAdminSex />
      <SelectLeaveDayCount />
      <SelectParkingSpotCount />
      <SelectIsExistedCleaningSupplier />
      <SelectIsExistedTowelSupplier />
      <SelectIsOnsiteManger />
      <SelectIsExistedFourInsurance />
      <SelectIsExistedRetirementPay />
    </>
  );
};

const JobPostingEditDetailOption = () => {
  const { role } = useJobPostingEditStore();
  return (
    <Container>
      <HeaderLabel>매장 상세정보 입력*</HeaderLabel>
      {role === "디자이너" ? <DesignerOptions /> : <InternOptions />}
    </Container>
  );
};

export default JobPostingEditDetailOption;
