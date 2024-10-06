import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";
import Banner from "../../banner";
import FindJobRequiredFilter from "./find-job-required-filter";
import JobSearchButton from "./job-search-button";
import NearJobSearchButton from "./near-job-search-button";
import PremiumJobPosting from "./premium-job-posting";
import JobPostingList from "./job-posting-list";

const Container = styled.div`
  width: 100%;
`;

const SearchButtonWrapper = styled.div`
  width: 100%;
  margin-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const FindJobSection = () => {
  return (
    <Container>
      <FindJobRequiredFilter />
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

export default FindJobSection;
