import styled from "styled-components";
import ShortDescriptionInput from "./required-field-section-components/short-description-input";
import UserNameInput from "./required-field-section-components/user-name-input";
import pxToVw from "@/lib/dpi-converter";
import RegionsSelect from "./required-field-section-components/regions-select";
import AgeInput from "./required-field-section-components/age-input";
import AppliedRoleSelect from "./required-field-section-components/applied-role-select";
import WorkTypeSelect from "./required-field-section-components/work-type-select";
import SettlementAllowanceSelect from "./required-field-section-components/settlement-allowance-select";
import DesignerLicensesSelect from "./required-field-section-components/designer-licenses-select";

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
    </Contianer>
  );
};

export default RequiredFieldSection;
