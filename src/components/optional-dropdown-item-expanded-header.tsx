import styled from "styled-components";
import ArrowDownGreyIcon from "./icons/arrow-down-grey-icon";
import { fonts } from "@/styles/fonts";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: 120px;
`;

const OptionalDropdownItemExpandedHeader = ({
  label = "라벨",
  onClick = () => {}
}) => {
  return (
    <Container onClick={onClick}>
      <LabelContainer>{label}</LabelContainer>
      <ArrowDownGreyIcon />
    </Container>
  );
};

export default OptionalDropdownItemExpandedHeader;
