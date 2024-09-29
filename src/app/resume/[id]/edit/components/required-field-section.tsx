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
import { useResumeEditStore } from "@/stores/resume-edit-store";
import InternExpectedSalarySelect from "./required-field-section/intern-expected-salary-select";
import InternExperienceYearNumberSelect from "./required-field-section/intern-experience-year-number-select";

const Contianer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${pxToVw(24)};
`;

const RequiredFieldSection = () => {
  const { appliedRole } = useResumeEditStore((state) => ({
    appliedRole: state.appliedRole
  }));

  return (
    <Contianer>
      <ShortDescriptionInput />
      <UserNameInput />
      <RegionsSelect />
      <AgeInput />
      <AppliedRoleSelect />
      <WorkTypeSelect />
      {appliedRole === "디자이너" && <SettlementAllowanceSelect />}
      {appliedRole === "인턴" && <InternExpectedSalarySelect />}
      <DesignerLicensesSelect />
      {appliedRole === "디자이너" && <DesignerExperienceYearNumberSelect />}
      {appliedRole === "인턴" && <InternExperienceYearNumberSelect />}
    </Contianer>
  );
};

export default RequiredFieldSection;
