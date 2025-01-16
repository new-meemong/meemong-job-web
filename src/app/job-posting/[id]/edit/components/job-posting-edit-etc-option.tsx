import InputMainHairDye from "./etc-option-components/input-main-haire-dye";
import InputStoreInstagramUrl from "./etc-option-components/input-store-url";
import InputWorkTime from "./etc-option-components/InputWorkTime";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

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
      <InputMainHairDye />
    </Container>
  );
};

export default JobPostingEditEtcOption;
