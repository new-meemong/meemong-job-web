import BackIcon from "./header-icons/back-icon";
import ConfirmModal from "../modals/confirm-modal";
import NoticeModal from "../modals/notice-modal";
import OptionIcon from "./header-icons/option-icon";
import SingleSelectBottomModal from "../modals/single-select-bottom-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  isEnableButton: boolean;
  appliedRole: string;
}

const ResumeHeader = ({
  title,
  resumeId,
  isMine,
  isEnableButton,
  appliedRole,
}: ResumeHeaderProps) => {
  const router = useRouter();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeModalMessage, setNoticeModalMessage] = useState("");

  const { deleteResume } = useResumeListStore((state) => ({
    deleteResume: state.deleteResume,
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
      router.push(`/resume/${resumeId}/edit?source=web`);
    } else if (option === "삭제") {
      setIsDeleteConfirmModalOpen(true);
    }

    setIsOptionModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteConfirmModalOpen(false);
    const { status, message } = await deleteResume(resumeId);

    if (status) {
      setNoticeModalMessage(message);
      setIsNoticeModalOpen(true);
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
      <Title>{`${appliedRole} ${title}`}</Title>
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

export default ResumeHeader;
