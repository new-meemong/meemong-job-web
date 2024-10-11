import ResumeItem from "@/components/resume-item";
import pxToVw from "@/lib/dpi-converter";
import { useResumeListStore } from "@/stores/resume-list-store";
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

const ResumeList = () => {
  const { resumeList } = useResumeListStore((state) => ({
    resumeList: state.resumeList
  }));

  return (
    <Container>
      <Title>맞춤 검색 결과</Title>
      {resumeList.map((result) => (
        <ResumeItem key={result.id} resume={result} />
      ))}
    </Container>
  );
};

export default ResumeList;
