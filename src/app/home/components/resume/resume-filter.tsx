import { colors } from "@/styles/colors";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";
import AppliedRole from "./main-filters/applied-role";
import ResumeLocation from "./main-filters/resume-location";
import WorkType from "./main-filters/work-type";
import Sex from "./main-filters/sex";
import DesignerExperienceYearNumber from "./main-filters/designer-experience-year-number";
import DesignerLicenses from "./main-filters/designer-licenses";
import ResumeOptionalFilterList from "./optional/base/resume-optional-filter-list";
import { useResumeListStore } from "@/stores/resume-list-store";
import InternExperienceYearNumber from "./main-filters/intern-experience-year-number";

const Container = styled.div`
  margin: ${pxToVw(0)} ${pxToVw(24)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  padding: ${pxToVw(12)};
  width: calc(100% - ${pxToVw(48)});
  border-radius: ${pxToVw(5)};
`;

const ResumeFilter = () => {
  const { getResumeFilterQuery } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery
  }));
  const appliedRole = getResumeFilterQuery("appliedRole");
  return (
    <Container>
      <AppliedRole />
      <ResumeLocation />
      <WorkType />
      <Sex />
      {appliedRole === "디자이너" && <DesignerExperienceYearNumber />}
      {appliedRole === "인턴" && <InternExperienceYearNumber />}
      <DesignerLicenses />
      <ResumeOptionalFilterList />
    </Container>
  );
};

export default ResumeFilter;
