import { colors } from "@/styles/colors";
import styled from "styled-components";
import OptionalFilterList from "../filters/optional-filter-list";
import pxToVw from "@/lib/dpi-converter";
import AppliedRole from "./main-filters/applied-role";
import ResumeLocation from "./main-filters/resume-location";
import WorkType from "./main-filters/work-type";
import Sex from "./main-filters/sex";
import DesignerExperienceYearNumber from "./main-filters/designer-experience-year-number";
import DesignerLicenses from "./main-filters/designer-licenses";
import ResumeOptionalFilterList from "./optional/base/resume-optional-filter-list";

const Container = styled.div`
  margin: ${pxToVw(0)} ${pxToVw(24)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  padding: ${pxToVw(12)};
  width: calc(100% - ${pxToVw(48)});
  border-radius: ${pxToVw(5)};
`;

const ResumeFilter = () => {
  return (
    <Container>
      <AppliedRole />
      <ResumeLocation />
      <WorkType />
      <Sex />
      <DesignerExperienceYearNumber />
      <DesignerLicenses />
      <ResumeOptionalFilterList />
    </Container>
  );
};

export default ResumeFilter;
