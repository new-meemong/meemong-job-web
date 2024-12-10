import JobPostingItem from "@/components/job-posting-item";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  padding: ${pxToVw(24)};
`;

const Title = styled.span`
  ${fonts.blackBold16}
  display: block;
  margin-bottom: ${pxToVw(20)};
`;

const JobPostingList = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "";
  const { jobPostingList = [] } = useJobPostingListStore();

  return (
    <Container>
      <Title>매장 취업하기</Title>
      {jobPostingList.map((jobPosting) => {
        return <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} />;
      })}
    </Container>
  );
};

export default JobPostingList;
