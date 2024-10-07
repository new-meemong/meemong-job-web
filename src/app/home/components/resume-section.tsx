import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

import Banner from "./banner";
import ResumeList from "./resume/resume-list";
import ResumeSearchButton from "./resume/resume-search-button";
import ResumeFilter from "./resume/resume-filter";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const ResumeSection = () => {
  const { resumeFilterQueries } = useResumeListStore((state) => ({
    resumeFilterQueries: state.resumeFilterQueries
  }));

  // 쿼리 문자열을 구조화된 객체로 변환
  const queryParams = new URLSearchParams(
    decodeURIComponent(resumeFilterQueries.replace(/\+/g, " "))
  );
  const structuredQueries: Record<string, string> = {};

  // 각 키-값 쌍을 객체로 변환하여 저장
  queryParams.forEach((value, key) => {
    structuredQueries[key] = value;
  });

  console.log("Structured structuredQueries:", structuredQueries);

  return (
    <Container>
      <ResumeFilter />
      <SearchWrapper>
        <ResumeSearchButton />
      </SearchWrapper>
      <Banner />
      <ResumeList />
    </Container>
  );
};

export default ResumeSection;
