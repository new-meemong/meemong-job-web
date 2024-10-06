import NoticeModal from "@/components/modals/notice-modal";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { JobPostingType } from "@/types/job-posting-type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

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
`;

const Button = styled.div`
  ${fonts.whiteBold16}
  height: ${pxToVw(48)};
  width: ${pxToVw(336)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JobPostingEditConfirmButton = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const {
    submitDesignerJobPosting,
    submitInternJobPosting,
    role,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useJobPostingEditStore((state) => ({
    submitDesignerJobPosting: state.submitDesignerJobPosting,
    submitInternJobPosting: state.submitInternJobPosting,
    role: state.role,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull
  }));
  const { updateJobPosting } = useJobPostingListStore((state) => ({
    updateJobPosting: state.updateJobPosting
  }));

  const handleConfirm = async () => {
    if (role === "디자이너") {
      const { status, message, data } = await submitDesignerJobPosting();

      if (status) {
        updateJobPosting(data as JobPostingType);
      }

      setModalMessage(message);
      setIsModalOpen(true);
    } else if (role === "인턴") {
      const { status, message, data } = await submitInternJobPosting();

      if (status) {
        updateJobPosting(data as JobPostingType);
      }
      setModalMessage(message);
      setIsModalOpen(true);
    }
  };

  return (
    <Container>
      <Button onClick={handleConfirm}>공고 수정하기</Button>
      <NoticeModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          if (
            (role === "디자이너" && !hasDesignerOptionNull) ||
            (role === "인턴" && !hasInternOptionNull)
          ) {
            router.back();
          }
        }}
      />
    </Container>
  );
};

export default JobPostingEditConfirmButton;
