import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { useState } from "react";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import OptionIcon from "./header-icons/option-icon";
import SingleSelectBottomModal from "../modals/single-select-bottom-modal";
import ConfirmModal from "../modals/confirm-modal";
import NoticeModal from "../modals/notice-modal";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${pxToVw(52)};
  padding-bottom: ${pxToVw(12)};
  padding-left: ${pxToVw(12)};
  padding-right: ${pxToVw(12)};
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
  resumeId: string;
  isMine: boolean;
}

const ResumeHeader = ({ title, resumeId, isMine }: ResumeHeaderProps) => {
  const router = useRouter();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const { resetStore, setFromResume } = useResumeEditStore((state) => ({
    resetStore: state.resetStore,
    setFromResume: state.setFromResume
  }));
  const { resumeList } = useResumeListStore((state) => ({
    resumeList: state.resumeList
  }));

  const options = isMine ? ["수정", "삭제"] : [];

  const handleBackClick = () => {
    router.back();
  };

  const handleOptionClick = () => {
    if (options.length > 0) {
      setIsOptionModalOpen(true);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (option === "수정") {
      const resume = resumeList.find(
        (resume) => resume.id.toString() === resumeId
      );
      if (resume) {
        resetStore();
        setFromResume(resume);
      }

      router.push(`/job-posting/${resumeId}/edit`);
    } else if (option === "삭제") {
      setIsDeleteConfirmModalOpen(true);
    }

    setIsOptionModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const handleNoticeConfirmOk = () => {
    setIsNoticeModalOpen(false);
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{title}</Title>
      <RightContainer onClick={handleOptionClick}>
        {options.length > 0 && <OptionIcon />}
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
        message="해당 게시글이 삭제되었습니다."
      />
    </Container>
  );
};

export default ResumeHeader;
