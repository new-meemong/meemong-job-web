import { colors } from "@/styles/colors";
import styled from "styled-components";
import OptionalFilterList from "../filters/optional-filter-list";
import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import pxToVw from "@/lib/dpi-converter";
import AppliedRole from "./base/applied-role";
import ResumeLocation from "./base/resume-location";
import WorkType from "./base/work-type";
import Sex from "./base/sex";
import DesignerExperienceYearNumber from "./base/designer-experience-year-number";

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
      <DropdownMultiSelectItem
        label="미용 라이센스"
        options={["자격증", "면허증", "없음", "상관 없음"]}
      />
      <OptionalFilterList />
    </Container>
  );
};

export default ResumeFilter;
