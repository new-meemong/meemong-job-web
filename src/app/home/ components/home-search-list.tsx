import TextBlackBold16 from "@/components/texts/text-black-bold-16";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const Title = styled(TextBlackBold16)`
  margin-bottom: 20px;
`;

const HomeSearchResultList = () => {
  return (
    <Container>
      <Title>맞춤 검색 결과</Title>
    </Container>
  );
};

export default HomeSearchResultList;
