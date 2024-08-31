import styled from "styled-components";
import ArrowDownGreyIcon from "./icons/arrow-down-grey-icon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import ArrowUpGreyIcon from "./icons/arrow-up-grey-icon";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  align-items: center;
  margin-top: ${pxToVw(6)};
  margin-bottom: ${pxToVw(6)};
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: ${pxToVw(120)};
`;

const OptionalDropdownItemExpandedHeader = ({
  label = "라벨",
  onClick = () => {}
}) => {
  return (
    <Container onClick={onClick}>
      <LabelContainer>{label}</LabelContainer>
      <ArrowUpGreyIcon />
    </Container>
  );
};

export default OptionalDropdownItemExpandedHeader;
