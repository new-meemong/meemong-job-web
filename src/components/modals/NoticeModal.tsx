import Modal from "react-modal";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: pxToVw(10),
    padding: 0,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // 어두운 배경 설정
  },
};

const Container = styled.div`
  width: ${pxToVw(260)};
  height: ${pxToVw(140)};
  border-radius: ${pxToVw(10)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${pxToVw(20)};
  padding: ${pxToVw(20)};
`;

const Content = styled.div`
  ${fonts.greyTextSemi16}
  white-space: pre-line;
  text-align: center;
`;

const ConfirmButton = styled.div`
  ${fonts.greyTextBold14}
`;

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const NoticeModal = ({
  isOpen,
  onClose,
  message,
  confirmText = "확인",
  onConfirm = () => {},
}: NoticeModalProps) => {
  const handleConfirmClick = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
    >
      <Container>
        <Content>{message}</Content>
        <ConfirmButton onClick={handleConfirmClick}>
          {confirmText}
        </ConfirmButton>
      </Container>
    </Modal>
  );
};

export default NoticeModal;
