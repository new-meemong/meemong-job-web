import NoticeModal from "@/components/modals/NoticeModal";
import { ResumeType } from "@/types/resume-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${pxToVw(70)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  gap: ${pxToVw(8)};
`;

const SaveDraftButton = styled.div`
  ${fonts.whiteBold16}
  height: ${pxToVw(48)};
  width: ${pxToVw(146)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PublishResumeButton = styled.div<{ $hasError: boolean }>`
  ${fonts.whiteBold16}
  height: ${pxToVw(48)};
  width: ${pxToVw(185)};
  background-color: ${(props) =>
    props.$hasError ? colors.purpleSecondary : colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomButtonSection = ({ source }: { source?: string }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull,
    saveDraft,
    submitResume,
  } = useResumeEditStore((state) => ({
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    saveDraft: state.saveDraft,
    submitResume: state.submitResume,
  }));
  const { updateResume } = useResumeListStore((state) => ({
    updateResume: state.updateResume,
  }));

  const handleSaveDraft = async () => {
    const { status, message, data } = await saveDraft();
    if (status) {
      updateResume(data as ResumeType);
      setModalMessage(message);
    } else {
      setModalMessage(message);
    }

    setIsModalOpen(true);
  };

  const handlePublishResume = async () => {
    // if (hasError) {
    //   return;
    // }
    const { status, message, data } = await submitResume();
    if (status) {
      updateResume(data as ResumeType);
    }
    setModalMessage(message);
    setIsModalOpen(true);
  };
  return (
    <Container>
      <SaveDraftButton
        onClick={handleSaveDraft}
      >{`저장 (나만 보기)`}</SaveDraftButton>
      <PublishResumeButton $hasError={false} onClick={handlePublishResume}>
        저장 및 게시
      </PublishResumeButton>
      <NoticeModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          if (
            (appliedRole === "디자이너" && !hasDesignerOptionNull) ||
            (appliedRole === "인턴" && !hasInternOptionNull)
          ) {
            if (source && source === "web") {
              router.back();
            }

            if (
              (source === "app" || !source) &&
              typeof window !== "undefined" &&
              window.closeWebview
            ) {
              window.closeWebview("close");
            }
          }
        }}
      />
    </Container>
  );
};

export default BottomButtonSection;
