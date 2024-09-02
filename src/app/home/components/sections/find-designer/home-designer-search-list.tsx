import ResumeItem from "@/components/resume-item";
import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  padding: ${pxToVw(24)};
  width: 100%;
`;

const Title = styled.span`
  ${fonts.blackBold16}
  display: block;
  margin-bottom: ${pxToVw(20)};
`;

const HomeDesignerSearchResultList = () => {
  const resultList = [
    {
      id: 1,
      title: "안녕하세요안녕하세요안녕하세요안녕하세요안녕",
      type: "디자이너",
      gender: "여",
      age: "23",
      certificate: true,
      location: "서울시 강남구",
      workExperience: "경력 1년 이하"
    },
    {
      id: 2,
      title: "안녕하세요안녕하세요안녕하세요안녕하세요안녕",
      type: "디자이너",
      gender: "여",
      age: "23",
      certificate: true,
      location: "서울시 강남구",
      workExperience: "경력 1년 이하"
    }
  ];
  return (
    <Container>
      <Title>맞춤 검색 결과</Title>
      {resultList.map((result, index) => (
        <ResumeItem key={result.id} resume={result} viewCount={234} />
      ))}
    </Container>
  );
};

export default HomeDesignerSearchResultList;
