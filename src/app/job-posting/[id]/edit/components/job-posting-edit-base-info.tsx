import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import DesignerRoleTab from "./base-info-components/designer-role-tab";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import SelectJobPostingRegions from "./base-info-components/select-job-posting-regions";
import SelectEducation from "./base-info-components/select-education";
import SelectOffDays from "./base-info-components/select-off-days";

const Container = styled.div``;

const HeaderLabel = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const JobPostingEditBaseInfo = () => {
  const { role } = useJobPostingEditStore();

  return (
    <Container>
      <HeaderLabel>기본 정보 입력*</HeaderLabel>
      <DesignerRoleTab />
      <SelectJobPostingRegions />
      <SelectEducation />
      <SelectOffDays />
    </Container>
  );
};

export default JobPostingEditBaseInfo;
