import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

interface ResumeEditLabelProps {
  label: string;
}

const ResumeEditLabel = ({ label }: ResumeEditLabelProps) => {
  return <Label>{label}</Label>;
};

export default ResumeEditLabel;
