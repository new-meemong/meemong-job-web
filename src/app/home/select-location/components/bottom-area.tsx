import FullButton from "@/components/buttons/full-button";
import TextBlackBold14 from "@/components/texts/text-black-bold-14";
import TextGreyNormal14 from "@/components/texts/text-grey-normal-14";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 106px;
  padding: 14px 24px;
`;

const CountContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectedCount = styled(TextBlackBold14)``;

const Label = styled(TextGreyNormal14)``;

interface BottomAreaProps {
  selectedCount: number;
}

const BottomArea = ({ selectedCount }: BottomAreaProps) => {
  return (
    <Container>
      <CountContainer>
        <SelectedCount>{`선택한 지역 ${selectedCount}`}</SelectedCount>
        <Label>최대 3개</Label>
      </CountContainer>
      <FullButton title="필터 적용하기" onClick={() => {}} />
    </Container>
  );
};

export default BottomArea;
