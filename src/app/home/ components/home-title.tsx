import TextSecondarySemi20 from "@/components/texts/text-secondary-semi-20";
import styled from "styled-components";

const Container = styled.div`
  height: 88px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Label = styled(TextSecondarySemi20)``;

const HomeTitle = () => {
  const label = "미몽에서 면접보고 바로 출근하세요!";
  return (
    <Container>
      <Label>{label}</Label>
    </Container>
  );
};

export default HomeTitle;
