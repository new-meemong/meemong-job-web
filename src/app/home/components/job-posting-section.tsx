import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";
import Banner from "./banner";
import JobSearchButton from "./job-posting/job-search-button";
import NearJobSearchButton from "./job-posting/near-job-search-button";
// import PremiumJobPosting from "./sections/find-job-posting/premium-job-posting";
import JobPostingList from "./job-posting/job-posting-list";
import JobPostingFilter from "./job-posting/job-posting-filter";

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
  return (
    <Container>
      <JobPostingFilter />
      <SearchButtonWrapper>
        <JobSearchButton />
      </SearchButtonWrapper>
      <SearchButtonWrapper>
        <NearJobSearchButton />
      </SearchButtonWrapper>
      {/* <PremiumJobPosting /> */}
      <Banner />
      <JobPostingList />
    </Container>
  );
};

export default JobPostingSection;
