import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  ${fonts.greyTextBold20}
`;

interface TitleSectionProps {
  title: string;
}

const TitleSection = ({ title }: TitleSectionProps) => {
  return <Container>{title}</Container>;
};

export default TitleSection;
