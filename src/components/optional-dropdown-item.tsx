import styled from "styled-components";
import ArrowDownGreyIcon from "./icons/arrow-down-grey-icon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  align-items: center;
  margin-top: ${pxToVw(6)};
  margin-bottom: ${pxToVw(6)};
`;

const LabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: ${pxToVw(120)};
`;

const ContentContainer = styled.div`
  width: ${pxToVw(168)};
`;

const Content = styled.div`
  ${fonts.purplePrimaryBold14}
`;

const OptionalDropdownItem = ({
  label = "라벨",
  content = "내용",
  onClick = () => {}
}) => {
  return (
    <Container onClick={onClick}>
      <LabelContainer>{label}</LabelContainer>
      <ContentContainer>
        <Content>{content}</Content>
      </ContentContainer>
      <ArrowDownGreyIcon />
    </Container>
  );
};

export default OptionalDropdownItem;
