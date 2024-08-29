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
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  width: 120px;
`;
const Label = styled(TextPrimarySemi14)``;

const OptionalDropdownItemExpandedHeader = ({
  label = "라벨",
  onClick = () => {}
}) => {
  return (
    <Container onClick={onClick}>
      <LabelContainer>
        <Label>{label}</Label>
      </LabelContainer>
      <ArrowDownGreyIcon />
    </Container>
  );
};

export default OptionalDropdownItemExpandedHeader;
