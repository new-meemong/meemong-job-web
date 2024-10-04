import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  ${fonts.greyTextBold18}
`;

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Container>{title}</Container>;
};

export default SectionTitle;
