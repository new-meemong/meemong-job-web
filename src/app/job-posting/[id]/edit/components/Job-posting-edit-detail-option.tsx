import BaseSingleInfoSelect from "@/components/select/base-single-info-select";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import SelectSex from "./detail-option-components/select-sex";
import SelectIsRestrictedAge from "./detail-option-components/select-is-restricted-age";
import CheckIsPossibleMiddleAge from "./detail-option-components/check-is-possible-middle-age";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import SelectDesignerLicense from "./detail-option-components/select-designer-license";

const Container = styled.div`
  background-color: #eceaff66;
  border-radius: ${pxToVw(4)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(12)};
  margin-top: ${pxToVw(20)};
`;

const HeaderLabel = styled.div`
  ${fonts.greyTextEditLabelBold16}
  height: ${pxToVw(30)};
  display: flex;
  align-items: center;
`;

const JobPostingEditDetailOption = () => {
  const { isRestrictedAge } = useJobPostingEditStore();
  return (
    <Container>
      <HeaderLabel>매장 상세정보 입력*</HeaderLabel>
      <SelectSex />
      <SelectIsRestrictedAge />
      {isRestrictedAge && <CheckIsPossibleMiddleAge />}
      <SelectDesignerLicense />
    </Container>
  );
};

export default JobPostingEditDetailOption;
