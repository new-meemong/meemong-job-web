import { fonts } from "@/styles/fonts";
import styled from "styled-components";
import InputWorkTime from "./etc-option-components/input-work-time";
import InputStoreInstagramUrl from "./etc-option-components/input-store-instagram-url";
import InputMainHairDie from "./etc-option-components/input-main-haire-die";

const Container = styled.div``;

const HeaderLabel = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

const HeaderSubLabel = styled.span`
  ${fonts.greyTextEditLabelSemi12}
`;

const JobPostingEditEtcOption = () => {
  return (
    <Container>
      <HeaderLabel>
        기타 항목 <HeaderSubLabel>(선택)</HeaderSubLabel>
      </HeaderLabel>
      <InputWorkTime />
      <InputStoreInstagramUrl />
      <InputMainHairDie />
    </Container>
  );
};

export default JobPostingEditEtcOption;