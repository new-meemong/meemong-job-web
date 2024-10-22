import styled from "styled-components";
import SectionTitle from "./base/section-title";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
`;

const Description = styled.div`
  ${fonts.greyTextSemi16}
  line-height: ${pxToVw(24)};
  white-space: pre-wrap;
`;

interface SelfIntroductionSectionProps {
  description: string;
}

const SelfIntroductionSection = ({
  description
}: SelfIntroductionSectionProps) => {
  return (
    <Container>
      <SectionTitle title="자기소개서" />
      <Description>{description}</Description>
    </Container>
  );
};

export default SelfIntroductionSection;
