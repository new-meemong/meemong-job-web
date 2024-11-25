import BackIcon from "./header-icons/back-icon";
import ConfirmModal from "../modals/confirm-modal";
import NoticeModal from "../modals/notice-modal";
import OptionIcon from "./header-icons/option-icon";
import SingleSelectBottomModal from "../modals/single-select-bottom-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useMyJobPostingListStore } from "@/stores/my-job-posting-list-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  z-index: 1;
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
  isMine: boolean;
  isEnableButton: boolean;
  role: string;
}

const JobPostingHeader = ({
  title,
  jobPostingId,
  isMine,
  isEnableButton = false,
  role,
}: ResumeHeaderProps) => {
  const router = useRouter();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeModalMessage, setNoticeModalMessage] = useState("");

  const { resetStore, setFromJobPosting } = useJobPostingEditStore((state) => ({
    resetStore: state.resetStore,
    setFromJobPosting: state.setFromJobPosting,
  }));
  const { jobPostingList, deleteJobPosting } = useJobPostingListStore(
    (state) => ({
      jobPostingList: state.jobPostingList,
      deleteJobPosting: state.deleteJobPosting,
    }),
  );
  const { getMyJobPostingList } = useMyJobPostingListStore((state) => ({
    getMyJobPostingList: state.getMyJobPostingList,
  }));

  const options = isMine
    ? [
        { key: "수정", value: "수정" },
        { key: "삭제", value: "삭제" },
      ]
    : [];

  const handleBackClick = () => {
    router.back();
  };

  const handleOptionClick = () => {
    if (options.length > 0) {
      setIsOptionModalOpen(true);
    }
  };

  const handleOptionSelect = (option: string | null) => {
    if (option === "수정") {
      const jobPosting = jobPostingList.find(
        (posting) => posting.id.toString() === jobPostingId,
      );
      if (jobPosting) {
        resetStore(); // 스토어를 초기화
        setFromJobPosting(jobPosting); // 해당 id의 데이터를 스토어에 설정
      }

      router.push(`/job-posting/${jobPostingId}/edit`);
    } else if (option === "삭제") {
      setIsDeleteConfirmModalOpen(true);
    }

    setIsOptionModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteConfirmModalOpen(false);
    const { status, message } = await deleteJobPosting(jobPostingId);

    if (status) {
      setNoticeModalMessage(message);
      setIsNoticeModalOpen(true);
      await getMyJobPostingList();
    } else {
      setNoticeModalMessage(message);
      setIsNoticeModalOpen(true);
    }
  };

  const handleNoticeConfirmOk = () => {
    setIsNoticeModalOpen(false);
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        {isEnableButton && <BackIcon />}
      </LeftContainer>
      <Title>{`${role} ${title}`}</Title>
      <RightContainer onClick={handleOptionClick}>
        {isEnableButton && options.length > 0 && <OptionIcon />}
      </RightContainer>
      <SingleSelectBottomModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        options={options}
        onSelect={handleOptionSelect}
      />
      <ConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
        message="삭제하시겠습니까?"
        confirmText="삭제하기"
        onConfirm={handleDeleteConfirm}
        cancelText="취소"
        isWarning
      />
      <NoticeModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onConfirm={handleNoticeConfirmOk}
        message={noticeModalMessage}
      />
    </Container>
  );
};

export default JobPostingHeader;
