import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

interface EditResumeLabelProps {
  label: string;
}

const EditResumeLabel = ({ label }: EditResumeLabelProps) => {
  return <Label>{label}</Label>;
};

export default EditResumeLabel;
