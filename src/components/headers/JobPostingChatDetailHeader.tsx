import BackIcon from "./header-icons/BackIcon";
import ConfirmModal from "../modals/ConfirmModal";
import OptionIcon from "./header-icons/OptionIcon";
import SingleSelectBottomModal from "../modals/single-select-bottom-modal";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

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
  /* border-bottom: ${pxToVw(1)} solid ${colors.greyLine}; */
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

const JobPostingChatDetailHeader = ({
  otherUserDisplayName,
  source,
}: {
  otherUserDisplayName: string;
  source: string;
}) => {
  const router = useRouter();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const options = [
    { key: "차단하기", value: "차단하기" },
    { key: "신고하기", value: "신고하기" },
  ];

  const handleBackClick = () => {
    if (source === "app") {
      window.closeWebview("close");
    } else {
      router.back();
    }
  };

  const handleOptionClick = () => {
    // setIsOptionModalOpen(true);
  };

  const handleOptionSelect = (option: string | null) => {
    setIsOptionModalOpen(false);

    if (option === "차단하기") {
      setIsConfirmModalOpen(true);
    } else if (option === "신고하기") {
      setIsReportModalOpen(true);
    }
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{otherUserDisplayName}</Title>
      <RightContainer onClick={handleOptionClick}>
        {/* <OptionIcon /> */}
      </RightContainer>
      <SingleSelectBottomModal
        isOpen={isOptionModalOpen}
        onClose={() => setIsOptionModalOpen(false)}
        options={options}
        onSelect={handleOptionSelect}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        message={`차단하시겠습니까?\n\n차단하면 더 이상 채팅을 받지 않습니다.`}
        confirmText="차단하기"
        onConfirm={() => {}}
        cancelText="취소"
        isWarning
      />
      <ConfirmModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        message="신고하시겠습니까?"
        confirmText="신고하기"
        onConfirm={() => {}}
        cancelText="취소"
        isWarning
      />
    </Container>
  );
};

export default JobPostingChatDetailHeader;
