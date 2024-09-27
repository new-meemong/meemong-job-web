import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
`;

interface EditLabelProps {
  label: string;
}

const EditLabel = ({ label }: EditLabelProps) => {
  return <Label>{label}</Label>;
};

export default EditLabel;
