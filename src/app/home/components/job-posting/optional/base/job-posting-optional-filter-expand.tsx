import AdminAge from "../expand-filters/admin-age";
import AdminSex from "../expand-filters/admin-sex";
import Age from "../expand-filters/age";
import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import DesignerExperienceYearNumber from "../expand-filters/designer-experience-year-number";
import DesignerLicenses from "../expand-filters/designer-licenses";
import DesignerPromotionPeriod from "../expand-filters/designer-promotion-period";
import EmployeeCount from "../expand-filters/employee-count";
import InternExperienceYearNumber from "../expand-filters/intern-experience-year-number";
import IsExistedCleaningSupplier from "../expand-filters/is-existed-cleaning-supplier";
import IsExistedDormitorySupport from "../expand-filters/is-existed-dormitory-support";
import IsExistedEducationSupport from "../expand-filters/is-existed-education-support";
import IsExistedFourInsurances from "../expand-filters/is-existed-four-insurances";
import IsExistedInternSystem from "../expand-filters/is-existed-intern-system";
import IsExistedMealSupport from "../expand-filters/is-existed-meal-support";
import IsExistedProductSupport from "../expand-filters/is-existed-product-support";
import IsExistedRetirementPay from "../expand-filters/is-existed-retirement-pay";
import IsExistedTowelSupplier from "../expand-filters/is-existed-towel-supplier";
import IsOnsiteManager from "../expand-filters/is-onsite-manager";
import LeaveDayCount from "../expand-filters/leave-day-count";
import MealTime from "../expand-filters/meal-time";
import ParkingSpotCount from "../expand-filters/parking-spot-count";
import SalesCommission from "../expand-filters/sales-commission";
import SalesLast3MonthsAvg from "../expand-filters/sales-last-3months-avg";
import Sex from "../expand-filters/sex";
import StoreInteriorRenovationAgo from "../expand-filters/store-interior-renovation-ago";
import StoreTypes from "../expand-filters/store-types";
import SubwayAccessibility from "../expand-filters/subway-accessibility";
import WorkCycleTypes from "../expand-filters/work-cycle-types";
import WorkType from "../expand-filters/work-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div`
  padding: ${pxToVw(12)} ${pxToVw(8)};
  margin-top: ${pxToVw(12)};
  border-radius: ${pxToVw(4)};
  background-color: rgb(236, 234, 255, 0.4);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: ${pxToVw(12)};
  border-bottom: ${pxToVw(1)} solid ${colors.white};
`;

// const HeaderLine = styled.div`
//   width: 100%;
//   height: ${pxToVw(1)};
//   background-color: ${colors.white};
// `;

const InitButton = styled.div`
  ${fonts.greyText4Bold14}
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${pxToVw(67)};
  height: ${pxToVw(40)};
  background-color: ${colors.white};
  border-radius: ${pxToVw(4)};
`;

const FilterExpandButton = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  width: ${pxToVw(223)};
  height: ${pxToVw(40)};
  background-color: ${colors.purpleBackgroundActive};
  border-radius: ${pxToVw(4)};
  padding: ${pxToVw(0)} ${pxToVw(10)};
`;

const ExpandButtonText = styled.span`
  ${fonts.purplePrimaryBold14}
  width: ${pxToVw(205)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface OptionalFilterUnexpandButtonProps {
  resetFilters: () => void;
  toggleExpanded: () => void;
}

const JobPostingOptionalFilterExpand = ({
  resetFilters,
  toggleExpanded,
}: OptionalFilterUnexpandButtonProps) => {
  const { getJobPostingFilterQuery } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
  }));
  const role = getJobPostingFilterQuery("role");
  return (
    <Container>
      <ButtonContainer>
        <InitButton onClick={resetFilters}>초기화</InitButton>
        <FilterExpandButton onClick={toggleExpanded}>
          <ExpandButtonText>맞춤형 매장 상세 닫기</ExpandButtonText>
          <ArrowDownPurpleIcon />
        </FilterExpandButton>
      </ButtonContainer>
      <Sex />
      <Age />
      <DesignerLicenses />
      <StoreTypes />
      <EmployeeCount />
      <IsExistedInternSystem />
      {role === "인턴" && <DesignerPromotionPeriod />}
      <StoreInteriorRenovationAgo />
      <WorkType />
      <WorkCycleTypes />
      {role === "디자이너" && <IsExistedEducationSupport />}
      <IsExistedMealSupport />
      <MealTime />
      <IsExistedProductSupport />
      <IsExistedDormitorySupport />
      <SalesCommission />
      {role === "디자이너" && <DesignerExperienceYearNumber />}
      {role === "인턴" && <InternExperienceYearNumber />}

      {role === "디자이너" && <SalesLast3MonthsAvg />}

      <SubwayAccessibility />
      <AdminAge />
      <AdminSex />
      <LeaveDayCount />
      <ParkingSpotCount />
      <IsExistedCleaningSupplier />
      <IsExistedTowelSupplier />
      {role === "인턴" && <IsOnsiteManager />}
      {role === "인턴" && <IsExistedFourInsurances />}
      {role === "인턴" && <IsExistedRetirementPay />}
    </Container>
  );
};

export default JobPostingOptionalFilterExpand;
