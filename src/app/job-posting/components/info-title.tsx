import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Title = styled.h1`
  ${fonts.greyTextBold18}
`;

interface PostingTitleProps {
  title: string;
}

const InfoTitle = ({ title }: PostingTitleProps) => {
  return <Title>{title}</Title>;
};

export default InfoTitle;
