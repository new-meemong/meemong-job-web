import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import DesignerRoleTab from "./base-option-components/designer-role-tab";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import SelectJobPostingRegions from "./base-option-components/select-job-posting-regions";
import SelectOffDays from "./base-option-components/select-off-days";
import SelectSettlementAllowance from "./base-option-components/select-settlement-allowance";
import SelectEducationIntern from "./base-option-components/select-education-intern";
import SelectIncentive from "./base-option-components/select-incentive";
import JobPostingEditDetailOption from "./jobb-posting-edit-detail-option";
import Divider from "./divider";
import JobPostingEditStoreImage from "./job-posting-edit-store-image";
import JobPostingEditEtcOption from "./job-posting-edit-etc-option";
import InputDescription from "./input-description";
import JobPostingEditNote from "./job-posting-edit-note";
import JobPostingEditConfirmButton from "./job-posting-edit-confirm-button";
import SelectEducationDesigner from "./base-option-components/select-education-designer";
import SelectEducationCost from "./base-option-components/select-education-cost";
import SelectInternSalary from "./base-option-components/select-intern-salary";

const Container = styled.div``;

const HeaderLabel = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const DesignerOptions = () => {
  return (
    <>
      <SelectEducationDesigner />
      <SelectOffDays />
      <SelectSettlementAllowance />
      <SelectIncentive />
      <JobPostingEditDetailOption />
    </>
  );
};

const InternOptions = () => {
  return (
    <>
      <SelectEducationIntern />
      <SelectEducationCost />
      <SelectOffDays />
      <SelectInternSalary />
      <JobPostingEditDetailOption />
    </>
  );
};

const JobPostingEditBaseOption = () => {
  const { role } = useJobPostingEditStore();

  return (
    <Container>
      <HeaderLabel>기본 정보 입력*</HeaderLabel>
      <DesignerRoleTab />
      <SelectJobPostingRegions />
      {role === "디자이너" ? <DesignerOptions /> : <InternOptions />}
      <Divider />
      <JobPostingEditStoreImage />
      <Divider />
      <JobPostingEditEtcOption />
      <InputDescription />
      <JobPostingEditNote />
      <JobPostingEditConfirmButton />
    </Container>
  );
};

export default JobPostingEditBaseOption;
