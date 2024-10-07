import { colors } from "@/styles/colors";
import styled from "styled-components";
import OptionalFilterList from "../filters/optional-filter-list";
import pxToVw from "@/lib/dpi-converter";
import AppliedRole from "./base/applied-role";
import ResumeLocation from "./base/resume-location";
import WorkType from "./base/work-type";
import Sex from "./base/sex";
import DesignerExperienceYearNumber from "./base/designer-experience-year-number";
import DesignerLicenses from "./base/designer-licenses";

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
      <OptionalFilterList />
    </Container>
  );
};

export default ResumeFilter;
