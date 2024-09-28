import styled from "styled-components";
import ShortDescriptionInput from "./required-field-section/short-description-input";
import UserNameInput from "./required-field-section/user-name-input";
import pxToVw from "@/lib/dpi-converter";
import RegionsSelect from "./required-field-section/regions-select";
import AgeInput from "./required-field-section/age-input";
import AppliedRoleSelect from "./required-field-section/applied-role-select";
import WorkTypeSelect from "./required-field-section/work-type-select";
import SettlementAllowanceSelect from "./required-field-section/settlement-allowance-select";
import DesignerLicensesSelect from "./required-field-section/designer-licenses-select";
import DesignerExperienceYearNumberSelect from "./required-field-section/designer-experience-year-number-select";

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${pxToVw(24)};
`;

const RequiredFieldSection = () => {
  return (
    <Contianer>
      <ShortDescriptionInput />
      <UserNameInput />
      <RegionsSelect />
      <AgeInput />
      <AppliedRoleSelect />
      <WorkTypeSelect />
      <SettlementAllowanceSelect />
      <DesignerLicensesSelect />
      <DesignerExperienceYearNumberSelect />
    </Contianer>
  );
};

export default RequiredFieldSection;
