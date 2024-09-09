import BaseSingleInfoSelect from "@/components/select/base-single-info-select";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${colors.purpleBackground2};
  border-radius: ${pxToVw(4)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(12)};
`;

const HeaderLabel = styled.div`
  ${fonts.greyTextEditLabelBold16}
  height: ${pxToVw(30)};
  display: flex;
  align-items: center;
`;

const JobPostingEditDetailOption = () => {
  return (
    <Container>
      <HeaderLabel>매장 상세정보 입력*</HeaderLabel>
    </Container>
  );
};

export default JobPostingEditDetailOption;
