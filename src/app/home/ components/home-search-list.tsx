import JobSeekerItem from "@/components/job-seeker-item";
import TextBlackBold16 from "@/components/texts/text-grey-text-bold-16";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const Title = styled(TextBlackBold16)`
  display: block;
  margin-bottom: 20px;
`;

const HomeSearchResultList = () => {
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
      id: 1,
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
        <JobSeekerItem key={result.id} jobSeeker={result} viewCount={234} />
      ))}
    </Container>
  );
};

export default HomeSearchResultList;
