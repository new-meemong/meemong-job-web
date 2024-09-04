import JobPostingItem from "@/components/job-posting-item";
import pxToVw from "@/lib/dpi-converter";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  padding: ${pxToVw(24)};
`;

const Title = styled.span`
  ${fonts.blackBold16}
  display: block;
  margin-bottom: ${pxToVw(20)};
`;

const JobPostingList = () => {
  const resultList = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  return (
    <Container>
      <Title>매장 취업하기</Title>
      {resultList.map((result, index) => (
        <JobPostingItem key={index} jobPosting={result} />
      ))}
    </Container>
  );
};

export default JobPostingList;
