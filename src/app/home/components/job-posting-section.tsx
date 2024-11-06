import Banner from "./banner";
import JobPostingFilter from "./job-posting/job-posting-filter";
// import NearJobSearchButton from "./job-posting/near-job-search-button";
// import PremiumJobPosting from "./sections/find-job-posting/premium-job-posting";
import JobPostingList from "./job-posting/job-posting-list";
import JobSearchButton from "./job-posting/job-search-button";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div`
  width: 100%;
`;

const SearchButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const JobPostingSection = () => {
  const { jobPostingFilterQueries } = useJobPostingListStore((state) => ({
    jobPostingFilterQueries: state.jobPostingFilterQueries,
  }));
  // 쿼리 문자열을 구조화된 객체로 변환
  const queryParams = new URLSearchParams(
    decodeURIComponent(jobPostingFilterQueries.replace(/\+/g, " ")),
  );
  const structuredQueries: Record<string, string> = {};

  // 각 키-값 쌍을 객체로 변환하여 저장
  queryParams.forEach((value, key) => {
    structuredQueries[key] = value;
  });

  return (
    <Container>
      <JobPostingFilter />
      <SearchButtonWrapper>
        <JobSearchButton />
      </SearchButtonWrapper>
      <SearchButtonWrapper>{/* <NearJobSearchButton /> */}</SearchButtonWrapper>
      {/* <PremiumJobPosting /> */}
      <Banner />
      <JobPostingList />
    </Container>
  );
};

export default JobPostingSection;
