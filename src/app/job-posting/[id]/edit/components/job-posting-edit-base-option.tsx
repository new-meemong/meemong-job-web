import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import DesignerRoleTab from "./base-option-components/designer-role-tab";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import SelectJobPostingRegions from "./base-option-components/select-job-posting-regions";
import SelectEducationDesigner from "./base-option-components/select-education-designer";
import SelectOffDays from "./base-option-components/select-off-days";
import SelectSettlementAllowance from "./base-option-components/select-settlement-allowance";
import SelectEducationIntern from "./base-option-components/select-education-intern";
import SelectIncentive from "./base-option-components/select-incentive";
import JobPostingEditDetailInfo from "./Job-posting-edit-detail-option";

const Container = styled.div``;

const HeaderLabel = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const JobPostingEditBaseOption = () => {
  const { role } = useJobPostingEditStore();

  return (
    <Container>
      <HeaderLabel>기본 정보 입력*</HeaderLabel>
      <DesignerRoleTab />
      <SelectJobPostingRegions />
      <SelectEducationIntern />
      <SelectOffDays />
      <SelectSettlementAllowance />
      <SelectIncentive />
      <JobPostingEditDetailInfo />
    </Container>
  );
};

export default JobPostingEditBaseOption;