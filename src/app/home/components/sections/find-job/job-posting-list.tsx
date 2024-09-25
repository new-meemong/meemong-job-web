import JobPostingItem from "@/components/job-posting-item";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
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
  const { jobPostingList = [] } = useJobPostingListStore();

  return (
    <Container>
      <Title>매장 취업하기</Title>
      {jobPostingList.map((jobPosting, index) => (
        <JobPostingItem
          key={index}
          id={jobPosting.id}
          storeName={jobPosting.storeName}
          storeRegion={jobPosting.storeRegion}
          postingTitle={jobPosting.postingTitle}
          monthlyEducationCount={jobPosting.monthlyEducationCount}
          availableOffDays={jobPosting.availableOffDays}
          settlementAllowance={jobPosting.settlementAllowance}
          incentive={jobPosting.incentive}
          JobPostingsStoreImages={jobPosting.JobPostingsStoreImages}
        />
      ))}
    </Container>
  );
};

export default JobPostingList;
