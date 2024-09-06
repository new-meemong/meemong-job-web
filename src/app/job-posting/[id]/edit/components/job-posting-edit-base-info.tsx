import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import DesignerRoleTab from "./base-info-components/designer-role-tab";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import JobPostingRegions from "./base-info-components/job-posting-regions";

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
      <JobPostingRegions />
    </Container>
  );
};

export default JobPostingEditBaseInfo;
