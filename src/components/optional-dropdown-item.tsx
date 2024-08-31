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
`;

const LabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: 120px;
`;

const ContentContainer = styled.div`
  width: 168px;
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
