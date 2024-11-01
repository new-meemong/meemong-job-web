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
import { colors } from "@/styles/colors";

const Container = styled.div``;

const ContentContainer = styled.div`
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

const Divider = styled.div`
  width: 100%;
  height: ${pxToVw(12)};
  background-color: ${colors.white};
`;

const DesignerOptions = () => {
  const { isRestrictedAge } = useJobPostingEditStore();

  return (
    <>
      <ContentContainer>
        <HeaderLabel>구인 정보 입력*</HeaderLabel>
        <SelectSex />
        <SelectIsRestrictedAge />
        {isRestrictedAge && <CheckIsPossibleMiddleAge />}
        <SelectDesignerLicense />
        <SelectWorkType />
        <SelectWorkCycle />
        <SelectDesignerExperienceYearNumber />
        <SelectSalesLast3MonthAvg />
      </ContentContainer>
      <ContentContainer>
        <HeaderLabel>매장 정보 입력*</HeaderLabel>
        <SelectStoreTypes />
        <SelectEmployeeCount />
        <SelectIsExistedInternSystem />
        <SelectStoreInteriorRenovationAgo />
        <SelectIsExistedEducationSupport />
        <SelectIsExistedMealSupport />
        <SelectMealTime />
        <SelectIsExistedProductSupport />
        <SelectIsExistedDormitorySupport />
        <SelectSalesCommission />
        <SelectSubwayAccessibility />
        <SelectAdminSex />
        <SelectAdminAge />
        <SelectLeaveDayCount />
        <SelectParkingSpotCount />
        <SelectIsExistedCleaningSupplier />
        <SelectIsExistedTowelSupplier />
        <SelectIsOnsiteManger />
        <InputBasicCutPrice />
      </ContentContainer>
    </>
  );
};

const InternOptions = () => {
  const { isRestrictedAge } = useJobPostingEditStore();

  return (
    <>
      <ContentContainer>
        <HeaderLabel>구인 정보 입력*</HeaderLabel>
        <SelectSex />
        <SelectIsRestrictedAge />
        {isRestrictedAge && <CheckIsPossibleMiddleAge />}
        <SelectDesignerLicense />
        <SelectWorkType />
        <SelectWorkCycle />
        <SelectInternExperienceYearNumber />
        <SelectIsExistedFourInsurance />
        <SelectIsExistedRetirementPay />
      </ContentContainer>
      <ContentContainer>
        <HeaderLabel>매장 정보 입력*</HeaderLabel>
        <SelectStoreTypes />
        <SelectEmployeeCount />
        <SelectIsExistedInternSystem />
        <SelectDesignerPromotionPeriod />
        <SelectStoreInteriorRenovationAgo />
        <SelectIsExistedMealSupport />
        <SelectMealTime />
        <SelectIsExistedProductSupport />
        <SelectIsExistedDormitorySupport />
        <SelectSalesCommission />
        <SelectSubwayAccessibility />
        <SelectAdminSex />
        <SelectAdminAge />
        <SelectLeaveDayCount />
        <SelectParkingSpotCount />
        <SelectIsExistedCleaningSupplier />
        <SelectIsExistedTowelSupplier />
        <SelectIsOnsiteManger />
      </ContentContainer>
    </>
  );
};

const JobPostingEditDetailOption = () => {
  const { role } = useJobPostingEditStore();
  return (
    <Container>
      {role === "디자이너" ? <DesignerOptions /> : <InternOptions />}
    </Container>
  );
};

export default JobPostingEditDetailOption;
