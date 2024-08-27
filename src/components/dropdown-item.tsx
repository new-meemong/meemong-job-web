import styled from "styled-components";
import TextPrimarySemi14 from "./texts/text-primary-semi-14";
import TextPrimaryBold14 from "./texts/text-primary-bold-14";
import ArrowDownGreyIcon from "./icons/arrow-down-grey-icon";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
`;

const LabelContainer = styled.div`
  width: 120px;
`;
const Label = styled(TextPrimarySemi14)``;

const ContentContainer = styled.div`
  width: 184px;
`;

const Content = styled(TextPrimaryBold14)``;

const DropdownItem = ({ label = "라벨", content = "내용" }) => {
  return (
    <Container>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <ContentContainer>
        <Content>{content}</Content>
      </ContentContainer>
      <ArrowDownGreyIcon />
    </Container>
  );
};

export default DropdownItem;
