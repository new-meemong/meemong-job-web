import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import OptionIcon from "./header-icons/option-icon";
import SingleSelectBottomModal from "../modals/single-select-bottom-modal";
import { useState } from "react";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${pxToVw(52)};
  padding-bottom: ${pxToVw(12)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  position: sticky;
  top: 0;
  background-color: white;
`;

const LeftContainer = styled.div`
  width: ${pxToVw(40)};
`;

const RightContainer = styled.div`
  width: ${pxToVw(40)};
`;

const Title = styled.span`
  ${fonts.greyTextBold18}
`;

interface ResumeHeaderProps {
  title: string;
  jobPostingId: string;
}

const JobPostingHeader = ({ title, jobPostingId }: ResumeHeaderProps) => {
  const router = useRouter();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const { resetStore, setFromJobPosting } = useJobPostingEditStore((state) => ({
    resetStore: state.resetStore,
    setFromJobPosting: state.setFromJobPosting
  }));
  const { jobPostingList } = useJobPostingListStore((state) => ({
    jobPostingList: state.jobPostingList
  }));

  const options = ["수정", "삭제"];

  const handleBackClick = () => {
    router.back();
  };

  const handleOptionClick = () => {
    setIsOptionModalOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    if (option === "수정") {
      const jobPosting = jobPostingList.find(
        (posting) => posting.id.toString() === jobPostingId
      );
      if (jobPosting) {
        resetStore(); // 스토어를 초기화
        setFromJobPosting(jobPosting); // 해당 id의 데이터를 스토어에 설정
      }

      router.push(`/job-posting/${jobPostingId}/edit`);
    } else if (option === "삭제") {
      // 삭제 로직
    }

    setIsOptionModalOpen(false);
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{title}</Title>
      <RightContainer onClick={handleOptionClick}>
        <OptionIcon />
      </RightContainer>
      <SingleSelectBottomModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        options={options}
        onSelect={handleOptionSelect}
      />
    </Container>
  );
};

export default JobPostingHeader;
